import { Env } from "../utils/environment";
import { User } from "../utils/interfaces";

export interface AddTodosResponse {
  title: string;
  message: string;
}

export const addTodo = async (nom: string, content: string) => {
  const user: User = JSON.parse(localStorage.getItem("user") ?? "{id: -1}");
  try {
    const response = await fetch(`${Env.baseUrl}/list/${user.id}`, {
      method: "post",
      body: JSON.stringify({
        nom: nom,
        content: content,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
        "x-auth": localStorage.getItem("token") ?? "",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
