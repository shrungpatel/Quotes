import { useEffect, useState } from "react";
import "./App.css";
import {
  CardContent,
  Checkbox,
  Grid,
} from "@mui/material/";
import { Card } from "@mui/material";
import { getAuth } from "firebase/auth";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

function Saved() {
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [gotQuotes, setGotQuotes] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuotes();
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  async function getQuotes() {
    const auth = getAuth();
    console.log(
      "Auth.currentUser: " + auth.currentUser + " Got quotes: " + gotQuotes,
    );
    if (auth.currentUser != null && gotQuotes === false) {
      const q = query(
        collection(db, "Users"),
        where("email", "==", auth.currentUser.email),
      );
      const querySnapshot = await getDocs(q);
      let i = 0;
      // console.log(gotQuotes);
      querySnapshot.forEach(async (doc) => {
        const quotesArray = doc.data().quotesID;
        console.log(Object.entries(quotesArray));
        Object.entries(quotesArray).forEach((pair: any) => {
          makeCard(pair[0], pair[1]);
          i++;
        });
        setGotQuotes(true);
      });
    }
    console.log("Loading: " + loading);
  }

  const makeCard = (content: string, author: string) => {
    content =
      content.length < 150 ? content : content.substring(0, 150) + "...";
    cards.push(
      <CardContent className="App-Card">
        <h4>{content}</h4>
        <p>{author}</p>
        <Checkbox
          className="App-like-icon"
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          defaultChecked
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </CardContent>,
    );
    setCards(cards);
  };

  return loading ? (
    <h1 className="middle">Loading (updated)...</h1>
  ) : (
    <Grid>
      <Card
        className="App-newBackground"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          height: "100vh" /* takes up the entire screen */,
        }}
      >
        {cards}
      </Card>
    </Grid>
  );
}
export default Saved;
