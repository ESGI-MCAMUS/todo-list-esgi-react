import * as React from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/json/404.json";
import { Navbar } from "../components/Navbar.component";
import { Colors } from "../utils/Colors";

interface NotFoundProps {}

export const NotFound: React.FunctionComponent<NotFoundProps> = ({}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Navbar currentRoute="/404" />
      <Lottie options={defaultOptions} height={400} width={400} />
      <h1
        style={{
          color: Colors.white,
          fontFamily: "Inter",
          fontWeight: 900,
          fontSize: "45px",
          textTransform: "uppercase",
        }}
      >
        Page introuvable
      </h1>
    </div>
  );
};
