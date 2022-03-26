import * as React from "react";
import { Navbar } from "../components/Navbar.component";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Colors } from "../utils/Colors";
import { Spacer } from "../components/Spacer.component";
import { login } from "../api/login";
import { useState } from "react";
import { User } from "../utils/interfaces";
import { Navigate } from "react-router-dom";

interface LoginProps {}

export const Login: React.FunctionComponent<LoginProps> = ({}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [redirectTo, setRedirectTo] = React.useState("");

  const handleConnect = () => {
    (async () => {
      const loginRes = await login(email, password);

      if (loginRes.hasOwnProperty("message")) {
        setError(loginRes.message);
      } else {
        setError("");
        const user: User = loginRes;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user.token);
        setRedirectTo("/todos");
      }
    })();
  };
  return (
    <div>
      {redirectTo !== "" && <Navigate replace to={redirectTo} />}
      <Navbar currentRoute="connexion" />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: Colors.primary,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.3)",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              color: Colors.white,
              fontFamily: "Inter",
              fontWeight: 900,
              fontSize: "45px",
              textTransform: "uppercase",
            }}
          >
            Connexion
          </h1>
          <Spacer />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <Spacer />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </InputGroup>
          <Spacer />
          <Button variant="dark" onClick={() => handleConnect()}>
            Se connecter
          </Button>
          {error !== "" && (
            <div>
              <Spacer />
              <p
                style={{
                  color: Colors.error,
                  fontFamily: "Inter",
                  fontStyle: "italic",
                }}
              >
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
