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
    getQuote();
  }, []);
  const getQuote = () => {
    axios
      .get("https://api.quotable.io/quotes")
      .then(function (response: any) {
        // console.log(response);
        console.log(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      })
      .finally(function () {});
  };
  return (
    <Card sx={{ display: "flex", flexWrap: "wrap" }}>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
          color: "orange",
        }}
      >
        <h3>Title</h3>
        <p>This is a lot of text for a card</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>
        <p>
          "This is an example of a quote that would be placed in a card. I am
          adding more words here to make it long.
        </p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
      <CardContent
        sx={{
          border: 1,
          borderRadius: "16px",
          m: 2,
          minWidth: "25%",
          boxShadow: 2,
        }}
      >
        <h3>Title</h3>

        <p>"This is an example of a quote that would be placed in a card.</p>
      </CardContent>
    </Card>
  );
}
export default Dashboard;
