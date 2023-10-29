import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import "./App.css";
function Dashboard() {
  const [cards, setCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    axios
      .get("https://api.quotable.io/quotes?limit=50")
      .then(function (response) {
        let newCards = [];
        for (let a = 0; a < 50; a++) {
          newCards.push(
            <>
            <CardContent
              className="App-Card"
              key={a}
            >
              <h4>{response.data.results[a].content}</h4>
              <p>{response.data.results[a].author}</p>
            </CardContent></>
          );
        }
        setCards(newCards);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Card className="App-newBackground"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        {cards}
      </Card>
    </div>
  );
}

export default Dashboard;
