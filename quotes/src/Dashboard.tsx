import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Grid,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { db } from "./Firebase";
import { updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./App.css";
import { getAuth } from "firebase/auth";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [newCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    document.title = "Home";
    getQuotes();
  }, []);

  const auth = getAuth();

  async function addQuote(key: string, author: string) {
    if (auth.currentUser != null) {
      const q = query(
        collection(db, "Users"),
        where("email", "==", auth.currentUser.email),
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.size);
      console.log(querySnapshot);
      if (querySnapshot.empty) {
        navigate("/Login");
        return;
      }
      let pastList: Map<string, string> = new Map(); //: string[][] | null = [];
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        const quotesID = doc.data().quotesID;
        // Check if quotesID is a Map and not null
        console.log(typeof quotesID);
        if (Object.keys(quotesID).length === 0) {
          pastList = new Map();
        } else {
          //const map = new Map(Object.entries({foo: 'bar'}));
          pastList = new Map(Object.entries(quotesID));
        }
        // she's applying to a company called sigma
        pastList.set(key, author);
        pastList.forEach((quote: string, author: string) => {
          console.log("New Quote: " + quote + " Author: " + author);
        });
        const quotesList = Object.fromEntries(pastList);
        await updateDoc(docRef, { quotesID: quotesList });
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
          onChange={() => addQuote(content, author)}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
        <Checkbox
          className="App-like-icon"
          {...label}
          sx={{ color: "black" }}
          // Add a new method that will get the quotes from a particular author
          onChange={() => getAuthorQuotes(author)}
          icon={<PersonSearchOutlinedIcon />}
        />
      </CardContent>
    ) : (
      <CardContent className="App-Card" key={key}>
        <h4>{content.substring(0, 150) + "..."}</h4>
        <p>{author}</p>
        <Checkbox
          className="App-like-icon"
          {...label}
          onChange={() => addQuote(content, author)}
          sx={{
            color: pink[800],
            "&.Mui-checked": {
              color: pink[600],
            },
          }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
        <Checkbox
          className="App-like-icon"
          {...label}
          sx={{ color: "black" }}
          onChange={() => getAuthorQuotes(author)}
          icon={<PersonSearchOutlinedIcon />}
        />
      </CardContent>
    );
  const getQuotes = () => {
    axios
      .get("http://localhost:5000/quotes")
      .then((response) => {
        //axios.get("https://api.quotable.io/quotes/random?limit=50&maxLength=150")
        //     .then(function (response) {
        // TO-DO: Let new cards -> set cards is a new function
        console.log("Quotes fetched from backend:");
        //console.log(response.data.results);
        for (let a = 0; a < response.data.length; a++) {
          newCards.push(
            makeCard(
              response.data[a].q,
              response.data[a].a,
              hash(response.data[a].q, response.data[a].a),
            ),
          );
        }
        setCards(newCards);
        //newCards;
        // setLoading(true/false)
      })
      .catch(function (error) {
        console.log("Error fetching quotes from frontend:", error);
      });
  };
  const getAuthorQuotes = (author: string) => {
    let url: string =
      "https://api.quotable.io/search/quotes?query=" +
      author +
      "&fields=author";
    axios
      .get(url)
      .then(function (response) {
        //App.goToSearch;
        // TO-DO: Let new cards -> set cards is a new function
        for (let a = 0; a < response.data.length; a++) {
          newCards.push(
            makeCard(
              response.data[a].content,
              response.data[a].author,
              response.data[a]._id,
            ),
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
      <title>Home</title>
      <Grid className="App-newBackground">
        <div>
          <br></br>
        </div>
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
    </Box>
  );
}

export default Dashboard;
function hash(q: string, a: string): string {
  /* Hash function to generate a unique key for each quote */
  let str = `${q}-${a}`;
  let hash = 0;
  try {
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      // Using bitwise shift for speed (31 * hash + char)
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
  } catch (e) {
    console.log("Error in hashing:", e);
  }
  // Convert the integer to a positive hexadecimal string
  return (Math.abs(hash) >>> 0).toString(16);
}
