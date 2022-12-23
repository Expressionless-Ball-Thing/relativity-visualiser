import "./App.css";
import NavBar from "./assets/NavBar/NavBar";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Routes } from "react-router-dom";
import { Route } from "react-router";
import Visualiser from "./Visualiser";

const AppBox = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  align-items: center;
  justify-content: center;
  padding: 64px;
`;

const GridWrap = styled(Box)`
  display: block;
  justify-items: center;
  align-items; center;
  margin: auto 20px;
`;

const App = () => {
  return (
    <AppBox>
      <NavBar />
      <Routes>
        <Route path="/relativity-visualiser/" element={<Visualiser />} />
      </Routes>
    </AppBox>
  );
};

export default App;
