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
import firebase from "firebase/app";
import "firebase/firestore";
import { db, firestore } from "./Firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./App.css";
import { getAuth } from "firebase/auth";
import { pink } from "@mui/material/colors";
// BREAKPOINT TO DECREASE FONT SIZE WHEN YOU CHANGE THE WINDOW SIZE
// ADD ICON TO CARD and ADD IT TO THE DATABASE ONCE YOU DO
// LOOK AT APP BAR (MOVE INTO APP.TSX)
// LOADING SCREEN
// USE STATE AND THEN DO AN TERNARY IF OPERATOR TO SEE IF YOU NEED TO SHOW LOADING SCREEN (USE MUI LOADING)
// MAKE SAVED
// LOOK AT HASHMAPS FOR RECOMMENDATION
// MAKE SURE THAT THE QUOTE IS NOT ALREADY IN THE LIST (CAN USE A SET)
// HAVE THE CHECK ALREADY THERE WHEN THE USER SEES A QUOTE THEY ALREADY LIKED
// SHOW THE WHOLE QUOTE WHEN YOU CLICK ON IT
function Dashboard() {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    getQuotes();
  }, []);
  const auth = getAuth();
  async function addQuote(key: string) {
    if (auth.currentUser != null) {
      const q = query(
        collection(db, "Users"),
        where("email", "==", auth.currentUser.email)
      );
      const current = doc(db, "User", "auth.currentUser.email");
      const querySnapshot = await getDocs(q);
      let pastList: string[] | null = [];
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        pastList = doc.data().quotesID;
        if (pastList != null && pastList.length != 0) {
          pastList.push(key);
        } else {
          pastList = [key];
        }
        await updateDoc(docRef, { quotesID: pastList });
      });
    }
  }
  const makeCard = (content: string, author: string, key: string) =>
    content.length < 150 ? (
      <CardContent className="App-Card" key={key}>
        <h4>{content}</h4>
        <p>{author}</p>
        <Checkbox
          className="App-like-icon"
          {...label}
          onChange={() => addQuote(key)}
          sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }}
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
        // TO-DO: Let new cards -> set cards is a new function
        let newCards = [];
        for (let a = 0; a < 50; a++) {
          newCards.push(
            makeCard(
              response.data[a].content,
              response.data[a].author,
              response.data[a]._id
            )
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
    <Box>
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
        {cards}
        {cards}
        {cards}
        {cards}
        {cards}
        {cards}
        {cards}
      </Card>
    </Grid>
    </Box>
  );
}

export default Dashboard;
