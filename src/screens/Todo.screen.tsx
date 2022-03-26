import * as React from "react";
import { Navbar } from "../components/Navbar.component";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Colors } from "../utils/Colors";
import { Spacer } from "../components/Spacer.component";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getTodos, Todo as TodoInterface } from "../api/getTodos";
import { Todo as TodoComponent } from "../components/Todo.component";
import { BsClipboardPlus } from "react-icons/bs";
import { addTodo, AddTodosResponse } from "../api/addTodo";

interface TodoProps {}

export const Todo: React.FunctionComponent<TodoProps> = ({}) => {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [titre, setTitre] = React.useState("");
  const [contenu, setContenu] = React.useState("");
  const [error, setError] = React.useState("");
  const [redirectTo, setRedirectTo] = React.useState("");
  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setRedirectTo("/connexion");
    } else {
      fetchTodos();
    }
  }, []);

  const fetchTodos = () => {
    (async () => {
      const todosFetch: TodoInterface[] = await getTodos();
      // @ts-ignore
      if (todosFetch.title === "unauthorized") {
        setRedirectTo("/deconnexion");
      } else {
        setTodos(todosFetch);
      }
    })();
  };

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleAddTodo = () => {
    console.log("handleAddTodo =>", titre, contenu);

    (async () => {
      const response: AddTodosResponse = await addTodo(titre, contenu);
      if (response.title === "unauthorized") {
        setRedirectTo("/deconnexion");
      } else if (response.title === "todo_created") {
        fetchTodos();
        handleClose();
      } else {
        setError(response.message);
      }
      console.log(response);
    })();
  };

  return (
    <div>
      {redirectTo !== "" && <Navigate replace to={redirectTo} />}
      <Navbar currentRoute="todos" />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          id="modal"
          variant="success"
          onClick={() => setShow(true)}
          style={{
            position: "absolute",
            top: "100px",
            right: "100px",
          }}
        >
          <BsClipboardPlus />
        </Button>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
        >
          <Modal.Header>
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{
                fontFamily: "Inter",
                textTransform: "uppercase",
                fontWeight: "900",
                textAlign: "center",
                width: "100%",
              }}
            >
              Ajouter une todo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                id="title"
                placeholder="Titre"
                onChange={(e) => setTitre(e.target.value)}
              />
            </InputGroup>
            <Spacer />
            <InputGroup className="mb-3">
              <FormControl
                id="content"
                placeholder="Contenu"
                onChange={(e) => setContenu(e.target.value)}
                as="textarea"
              />
            </InputGroup>
            {error !== "" && (
              <div>
                <Spacer />
                <p
                  id="error-msg"
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
          </Modal.Body>
          <Modal.Footer>
            <Button
              id="submit"
              variant="success"
              onClick={() => handleAddTodo()}
            >
              Ajouter
            </Button>
            <Button variant="danger" onClick={() => handleClose()}>
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          style={{
            backgroundColor: Colors.primary,
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px 0px rgba(0,0,0,0.3)",
            width: "40%",
            height: "80vh",
            overflowY: "scroll",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            id="todos-title"
            style={{
              color: Colors.white,
              fontFamily: "Inter",
              fontWeight: 900,
              fontSize: "45px",
              textTransform: "uppercase",
            }}
          >
            Mes TODOS
          </h1>
          <Spacer />
          {todos.length === 0 && (
            <p
              style={{
                color: Colors.white,
                fontFamily: "Inter",
                fontWeight: "bold",
              }}
            >
              Vous n'avez pas encore de todo, commencez par en ajouter une pour
              les visualiser 🤡
            </p>
          )}
          {todos.map((todo) => (
            <>
              <TodoComponent
                id={todo.id}
                name={todo.name}
                date={new Date(todo.created_at)}
              >
                {todo.content}
              </TodoComponent>
              <Spacer />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
