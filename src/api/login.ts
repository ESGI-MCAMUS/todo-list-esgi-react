import { Env } from "../utils/environment";

export interface LoginResponse {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  token: string;
}

export interface ErrorLoginResponse {
  title: string;
  message: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${Env.baseUrl}/user/login`, {
      method: "post",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
