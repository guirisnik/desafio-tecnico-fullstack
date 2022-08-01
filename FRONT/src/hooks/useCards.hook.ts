import { useState } from "react";
import axios, { AxiosResponse } from "axios";

type CardRequest = {
  titulo: string;
  conteudo: string;
  lista: string;
};

export type CardResponse = CardRequest & { id: string };

export function useCards() {
  const [error, setError] = useState<any>(null);
  const [cards, setCards] = useState<CardResponse[]>([]);

  const client = axios.create({
    baseURL: "http://localhost:5000/cards",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  async function getAll(): Promise<CardResponse[] | undefined> {
    try {
      const response = await client.get<string, AxiosResponse<CardResponse[]>>(
        ""
      );

      setCards(response.data);
      return response.data;
    } catch (error) {
      setError(error);
    }
  }

  async function create(
    cardRequest: CardRequest
  ): Promise<CardResponse | undefined> {
    try {
      const response = await client.post<
        string,
        AxiosResponse<CardResponse>,
        CardRequest
      >("", cardRequest);

      setCards(cards.concat(response.data));
      return response.data;
    } catch (error) {
      setError(error);
    }
  }

  async function update(
    id: string,
    cardRequest: CardRequest
  ): Promise<CardResponse | undefined> {
    try {
      const response = await client.put<
        string,
        AxiosResponse<CardResponse>,
        CardRequest
      >(id, cardRequest);

      const updatedCard = response.data;
      const cardIndex = cards.findIndex((card) => card.id === updatedCard.id);
      setCards([
        ...cards.slice(0, cardIndex),
        updatedCard,
        ...cards.slice(cardIndex + 1),
      ]);
      return response.data;
    } catch (error) {
      setError(error);
    }
  }

  async function destroy(id: string): Promise<CardResponse[] | undefined> {
    try {
      const response = await client.delete<
        string,
        AxiosResponse<CardResponse[]>
      >(id);

      setCards(response.data);
      return response.data;
    } catch (error) {
      setError(error);
    }
  }

  return {
    error,
    cards,
    getAll,
    create,
    update,
    destroy,
  };
}
