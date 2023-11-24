import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Button,
  Box,
  CardContent,
  IconButton,
  Toolbar,
  AppBar,
  Checkbox,
  Grid,
} from "@mui/material/";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { query, collection, where, doc, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import axios from "axios";
function Saved() {
  const auth = getAuth();
  let quotesList: string[] = [];
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [contents, setContents] = useState<Set<string>>(new Set());
  const [gotQuotes, setGotQuotes] = useState(false);
  useEffect(() => {
    getQuotes();
  }, []);
  async function getQuotes() {
    if (auth.currentUser != null && gotQuotes == false) {
      const q = query(
        collection(db, "Users"),
        where("email", "==", auth.currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      let i = 0;
      console.log("Size" + querySnapshot.size);
      console.log(gotQuotes);
      querySnapshot.forEach(async (doc) => {
        doc.data().quotesID.forEach((id: any) => {
          makeCards(id);
          i++;
        });
        console.log("Looped through the for each loop " + i + " times");
        setGotQuotes(true);
        console.log(gotQuotes);
        quotesList = doc.data().quotesID;
        console.log(quotesList.length);
        console.log("Size of contents " + contents.size);
      });
      //makeCards();
    }
  }
  const makeCards = (id: string) => {
    //quotesList.forEach((id) => {
    const url = `https://api.quotable.io/quotes/${id}`;
    processURL(url);
    //});
  };
  const processURL = (url: string) => {
    axios
      .get(url)
      .then(function (response) {
        makeCard(response.data.content, response.data.author);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const makeCard = (content: string, author: string) => {
    contents.add(content + " " + author);
    console.log("New thing size " + contents.size);
    // setContents(contents);
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
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      </CardContent>
    );
    setCards(cards);
    console.log(cards.length);
  };
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
export default Saved;