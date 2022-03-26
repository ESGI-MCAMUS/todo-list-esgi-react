import * as React from "react";
import { Colors } from "../utils/Colors";
import { BsTrash } from "react-icons/bs";
import { removeTodo } from "../api/removeTodo";

interface TodoProps {
  name: string;
  date: Date;
  children: string;
  id: number;
}

export const Todo: React.FunctionComponent<TodoProps> = ({
  name,
  date,
  children,
  id,
}) => {
  const handleRemoveTodo = () => {
    (async () => {
      const response = await removeTodo(id);
      window.location.reload();
      console.log(response);
    })();
  };
  return (
    <div
      style={{
        backgroundColor: Colors.secondary,
        borderRadius: "10px",
        padding: "10px",
        margin: "10px",
        boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            color: Colors.white,
            fontFamily: "Inter",
            fontWeight: "bold",
          }}
        >
          {name}
        </h2>
        <BsTrash
          onClick={() => handleRemoveTodo()}
          style={{
            color: Colors.white,
            fontSize: "25px",
            cursor: "pointer",
          }}
        />
      </div>
      <p
        style={{
          color: Colors.white,
          fontFamily: "Inter",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          textAlign: "justify",
          padding: "10px",
        }}
      >
        {children}
      </p>
      <p
        style={{
          color: Colors.white,
          fontFamily: "Inter",
          fontStyle: "italic",
          fontSize: "12px",
          alignSelf: "flex-end",
        }}
      >
        {date.toLocaleString()}
      </p>
    </div>
  );
};