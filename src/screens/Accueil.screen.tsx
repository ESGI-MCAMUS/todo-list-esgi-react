import * as React from "react";
import { Navbar } from "../components/Navbar.component";
import Button from "react-bootstrap/Button";
import { Colors } from "../utils/Colors";

interface AccueilProps {}

export const Accueil: React.FunctionComponent<AccueilProps> = ({}) => (
  <div>
    <Navbar currentRoute="accueil" />
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1
          style={{
            color: Colors.white,
            fontFamily: "Inter",
            fontWeight: 900,
            fontSize: "45px",
            textTransform: "uppercase",
          }}
        >
          ✅ TODO List
        </h1>
      </div>
    </div>
  </div>
);
