import { Env } from "../utils/environment";
import { User } from "../utils/interfaces";

export interface Todo {
  id: number;
  name: string;
  content: string;
  created_at: string;
}

export interface ErrorGetTodosResponse {
  title: string;
  message: string;
}

export const getTodos = async () => {
  const user: User = JSON.parse(localStorage.getItem("user") ?? "{id: -1}");
  try {
    const response = await fetch(`${Env.baseUrl}/list/${user.id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "x-auth": localStorage.getItem("token") ?? "",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
