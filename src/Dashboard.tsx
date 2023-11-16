import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Paper,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { db, firestore } from './Firebase';
import { doc, setDoc } from 'firebase/firestore';
import "./App.css";
import { getAuth } from "firebase/auth";
// BREAKPOINT TO DECREASE FONT SIZE WHEN YOU CHANGE THE WINDOW SIZE
// ADD ICON TO CARD and ADD IT TO THE DATABASE ONCE YOU DO
// LOOK AT APP BAR (MOVE INTO APP.TSX)
// LOADING SCREEN
// USE STATE AND THEN DO AN TERNARY IF OPERATOR TO SEE IF YOU NEED TO SHOW LOADING SCREEN (USE MUI LOADING)
function Dashboard() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    getQuotes();
  }, []);
  // const [response, setResponse] = useState();
  const auth = getAuth();
  const addQuote = (key: number) =>
    db
      .collection("Users")
      .where("email" == auth.currentUser.email)
      .get()
      .then(db.collection("Users").doc);
  const makeCard = (content: string, author: string, key: number) =>
    content.length < 150 ? (
      <CardContent className="App-Card" key={key}>
        <h4>{content}</h4>
        <p>{author}</p>
        <Checkbox
          className="App-like-icon"
          {...label}
          onChange={addQuote(key)}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </CardContent>
    ) : (
      <CardContent className="App-Card" key={key}>
        <h4>{content.substring(0, 150) + "..."}</h4>
        <p>{author}</p>
        <Checkbox
          className="App-like-icon"
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </CardContent>
    );
  const getQuotes = () => {
    axios
      .get("https://api.quotable.io/quotes/random?limit=50")
      .then(function (response) {
        let newCards = [];
        for (let a = 0; a < 50; a++) {
          console.log(response.data[a]);
          newCards.push(
            makeCard(response.data[a].content, response.data[a].author, a)
          );
        }
        setCards(newCards);
        // setLoading(true/false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /*
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  });
  */
  return (
    <Grid>
      <Card
        className="App-newBackground"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {cards}
      </Card>
    </Grid>
  );
}

export default Dashboard;
