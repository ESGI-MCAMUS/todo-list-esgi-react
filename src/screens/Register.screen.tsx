import * as React from "react";
import { Navbar } from "../components/Navbar.component";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Colors } from "../utils/Colors";
import { Spacer } from "../components/Spacer.component";
import { Navigate } from "react-router-dom";
import { register, RegisterResponse } from "../api/register";

interface RegisterProps {}

export const Register: React.FunctionComponent<RegisterProps> = ({}) => {
  const [firstname, setFirsname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [redirectTo, setRedirectTo] = React.useState("");

  const handleConnect = () => {
    (async () => {
      const registerRes: RegisterResponse = await register(
        firstname,
        lastname,
        email,
        password,
        birthdate
      );

      if (registerRes.title === "user_created") {
        setError("");
        setRedirectTo("/connexion");
      } else {
        setError(registerRes.message);
      }
      console.log(registerRes);
    })();
  };
  return (
    <div>
      {redirectTo !== "" && <Navigate replace to={redirectTo} />}
      <Navbar currentRoute="inscription" />
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
            Inscription
          </h1>
          <Spacer />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Prénom"
              onChange={(e) => setFirsname(e.target.value)}
            />
          </InputGroup>
          <Spacer />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Nom"
              onChange={(e) => setLastname(e.target.value)}
            />
          </InputGroup>
          <Spacer />
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Email"
              onChange={(e) => setBirthdate(e.target.value)}
              type="date"
            />
          </InputGroup>
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
            S'inscrire
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
