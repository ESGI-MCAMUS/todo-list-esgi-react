import * as React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { Colors } from "../utils/Colors";

interface NavbarProps {
  currentRoute: string;
}

export const Navbar: React.FunctionComponent<NavbarProps> = ({
  currentRoute,
}) => {
  const token = localStorage.getItem("token");
  return (
    <Nav
      variant="pills"
      activeKey="1"
      style={{
        backgroundColor: Colors.primary,
        paddingTop: "20px",
        paddingBottom: "20px",
        boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.3)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
      }}
    >
      <Nav.Item>
        <Link
          to="/"
          style={{
            color: Colors.white,
            marginLeft: "20px",
            marginRight: "20px",
            fontFamily: "Inter",
            fontWeight: "bold",
            textTransform: "uppercase",
            textDecoration: currentRoute === "accueil" ? "underline" : "none",
          }}
        >
          Accueil
        </Link>
      </Nav.Item>
      {token === null && (
        <>
          <Nav.Item>
            <Link
              to="/connexion"
              style={{
                color: Colors.white,
                marginLeft: "20px",
                marginRight: "20px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration:
                  currentRoute === "connexion" ? "underline" : "none",
              }}
            >
              Connexion
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/inscription"
              style={{
                color: Colors.white,
                marginLeft: "20px",
                marginRight: "20px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textDecoration:
                  currentRoute === "inscription" ? "underline" : "none",
                textTransform: "uppercase",
              }}
            >
              Inscription
            </Link>
          </Nav.Item>
        </>
      )}
      {token !== null && (
        <>
          <Nav.Item>
            <Link
              to="/todos"
              style={{
                color: Colors.white,
                marginLeft: "20px",
                marginRight: "20px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: currentRoute === "todos" ? "underline" : "none",
              }}
            >
              Mes todos
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/deconnexion"
              style={{
                color: Colors.white,
                marginLeft: "20px",
                marginRight: "20px",
                fontFamily: "Inter",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration:
                  currentRoute === "deconnexion" ? "underline" : "none",
              }}
            >
              Se déconnecter
            </Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
};
