import React from "react";
import "./App.css";
import {
  Button,
  Box,
  CardContent,
  IconButton,
  Toolbar,
  AppBar,
} from "@mui/material/";
import { Container, Link, TextField, Stack, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Saved() {
  const makeCard = () => {
    let cards = [];
    for (let i = 0; i < 500; i++) {
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
          <h4>
            This is the quote that you would read on the card. This is the
            second sentence of the quote.
          </h4>
          <p>Author Name</p>
        </CardContent>
      );
    }
    return cards;
  };
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, ml: 2 }}
            ></IconButton>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Card
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {makeCard()}
      </Card>
    </div>
  );
}
export default Saved;
