import { useState } from "react";
import axios, { AxiosResponse } from "axios";

type AuthRequest = {
  login: string;
  senha: string;
};

type AuthResponse = {
  access_token: string;
  token_type: "Bearer";
};

function useAuth() {
  const [error, setError] = useState<any>(null);

  async function authenticate(): Promise<AuthResponse | undefined> {
    try {
      const response = await axios.post<
        string,
        AxiosResponse<AuthResponse>,
        AuthRequest
      >("http://localhost:5000/login", {
        login: "letscode",
        senha: "lets@123",
      });

      localStorage.setItem("token", response.data.access_token);
      return response.data;
    } catch (error: any) {
      setError(error);
    }
  }

  return { error, authenticate };
}

export { useAuth };
