import { Env } from "../utils/environment";

export interface RegisterResponse {
  title: string;
  message: string;
}

export const register = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  birthdate: string
) => {
  try {
    const response = await fetch(`${Env.baseUrl}/user/register`, {
      method: "post",
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        birthdate: birthdate,
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
