import { Env } from "../utils/environment";
import { User } from "../utils/interfaces";

export interface RemoveTodosResponse {
  title: string;
  message: string;
}

export const removeTodo = async (id: number) => {
  const user: User = JSON.parse(localStorage.getItem("user") ?? "{id: -1}");
  try {
    const response = await fetch(`${Env.baseUrl}/list/${user.id}`, {
      method: "delete",
      body: JSON.stringify({
        id: id,
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
