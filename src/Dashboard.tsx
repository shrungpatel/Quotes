import React from "react";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Button, Box, CardContent } from "@mui/material/";
import { Container, Link, TextField, Stack, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
//const axios = require('axios').default;
// define quotes interface here
function Dashboard() {
  useEffect(() => {
    getQuotes();
  }, []);
  const getQuotes = () => {
    axios
      .get("https://api.quotable.io/quotes?limit=5")
      .then(function (response: any) {
        // console.log(response);
        console.log(response.data);
        let cards = [];
        for (let a = 0; a < 5; a++) {
          console.log(response.data.results[a].content);
          console.log(response.data.results[a].author);
          cards.push(
            <CardContent
              sx={{
                border: 1,
                borderRadius: "16px",
                m: 2,
                //minWidth: "25%",
                maxWidth: "20%",
                boxShadow: 2,
                onMouseDown: { color: "orange" },
              }}
            >
              <h4>response.data.results[a].content</h4>
              <p>response.data.results[a].author</p>
            </CardContent>
          );
        }
        return cards;
      })
      .catch(function (error: any) {
        console.log(error);
        return -1;
      })
      .finally(function () { 
        return 1;
      });
      return 'have to';
  };
  return (
    <div><Card
    sx={{
      display: "flex",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "center",
    }}
  >
    {getQuotes()}
  </Card>
  <CardContent
              sx={{
                border: 1,
                borderRadius: "16px",
                m: 2,
                //minWidth: "25%",
                maxWidth: "20%",
                boxShadow: 2,
                onMouseDown: { color: "orange" },
              }}
            >
              <h4>temp</h4>
              <p>response.data.results[1].author</p>
            </CardContent>
            </div>
  );
}
export default Dashboard;