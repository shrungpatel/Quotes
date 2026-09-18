"""Generate the author-country map from the Firestore Authors collection."""

from __future__ import annotations

import argparse
from pathlib import Path

import firebase_admin
import pandas as pd
import plotly.express as px
from firebase_admin import credentials, firestore


BACKEND_DIR = Path(__file__).resolve().parent
SERVICE_ACCOUNT_PATH = BACKEND_DIR / "serviceAccountKey.json"
DEFAULT_OUTPUT_PATH = BACKEND_DIR / "Outputs" / "country_distribution_map.html"


def get_firestore_client():
    """Return a Firestore client using the project's existing service account."""

    try:
        firebase_admin.get_app()
    except ValueError:
        firebase_admin.initialize_app(credentials.Certificate(str(SERVICE_ACCOUNT_PATH)))

    return firestore.client()


def get_author_countries() -> list[dict[str, str]]:
    """Fetch author/country pairs from the Authors collection."""

    author_countries = []

    for author_document in get_firestore_client().collection("Authors").stream():
        author_data = author_document.to_dict()
        country = next(
            (
                value
                for field_name, value in author_data.items()
                if field_name.lower() == "country"
            ),
            None,
        )

        if isinstance(country, str) and country.strip():
            author_countries.append(
                {
                    "author": author_document.id,
                    "country": country.strip(),
                }
            )

    return author_countries


def create_map(output_path: Path = DEFAULT_OUTPUT_PATH) -> Path:
    """Create the choropleth and return the generated HTML path."""

    author_countries = get_author_countries()

    if not author_countries:
        raise RuntimeError("No Authors documents with a country field were found.")

    authors = pd.DataFrame(author_countries)
    country_counts = (
        authors["country"]
        .value_counts()
        .rename_axis("Country")
        .reset_index(name="Number of Authors")
    )

    figure = px.choropleth(
        country_counts,
        locations="Country",
        locationmode="country names",
        color="Number of Authors",
        hover_name="Country",
        color_continuous_scale=px.colors.sequential.Viridis,
        title="Authors by Country",
    )
    figure.update_layout(
        modebar_remove=[
            "zoom",
            "pan",
            "select",
            "lasso2d",
            "autoScale2d",
            "resetScale2d",
            "zoomIn2d",
            "zoomOut2d",
            "hoverClosestCartesian",
            "hoverCompareCartesian",
        ],
        margin={"l": 0, "r": 0, "t": 55, "b": 0},
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    figure.write_html(output_path, full_html=True, include_plotlyjs="cdn")
    return output_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    args = parser.parse_args()
    print(create_map(args.output))
