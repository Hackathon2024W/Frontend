import React from "react";
import ReactDOMClient from "react-dom/client";
import { Home } from "./screens/Home";
import { Landing } from "./screens/Landing";
import { MantineProvider } from "@mantine/core";


const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(
    localStorage.getItem('user') && localStorage.getItem('phoneNumber') ? 
    <MantineProvider>
    <Home /> 
    </MantineProvider>
    : <Landing />
);
