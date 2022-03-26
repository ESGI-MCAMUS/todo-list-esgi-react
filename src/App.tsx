import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Screens
import { Accueil } from "./screens/Accueil.screen";
import { Login } from "./screens/Login.screen";
import { Logout } from "./screens/Logout.screen";
import { NotFound } from "./screens/NotFound.screen";
import { Register } from "./screens/Register.screen";
import { Todo } from "./screens/Todo.screen";
import { Colors } from "./utils/Colors";

function App() {
  return (
    <div
      style={{
        backgroundColor: Colors.background,
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      ></link>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/todos" element={<Todo />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/deconnexion" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
