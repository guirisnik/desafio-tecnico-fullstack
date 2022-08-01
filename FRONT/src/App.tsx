import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Card } from "./components/Card";
import { Lane } from "./components/Lane";
import { useAuth } from "./hooks/useAuth.hook";
import { CardResponse, useCards } from "./hooks/useCards.hook";

function App() {
  const [todoCards, setTodoCards] = useState<CardResponse[]>([]);
  const [doingCards, setDoingCards] = useState<CardResponse[]>([]);
  const [doneCards, setDoneCards] = useState<CardResponse[]>([]);

  const { authenticate } = useAuth();
  const { getAll, cards, update, create, destroy } = useCards();

  useEffect(() => {
    (async () => {
      await authenticate();
      await getAll();
    })();
  }, []);

  useEffect(() => {
    if (cards) {
      setTodoCards(cards.filter((card) => card.lista === "ToDo"));
      setDoingCards(cards.filter((card) => card.lista === "Doing"));
      setDoneCards(cards.filter((card) => card.lista === "Done"));
    }
  }, [cards]);

  return (
    <Board>
      <Lane lista="ToDo" handleCreate={create}>
        {todoCards.map((card) => (
          <Card
            key={card.id}
            {...card}
            handleUpdate={update}
            handleDelete={destroy}
          />
        ))}
      </Lane>
      <Lane lista="Doing">
        {doingCards.map((card) => (
          <Card
            key={card.id}
            {...card}
            handleUpdate={update}
            handleDelete={destroy}
          />
        ))}
      </Lane>
      <Lane lista="Done">
        {doneCards.map((card) => (
          <Card
            key={card.id}
            {...card}
            handleUpdate={update}
            handleDelete={destroy}
          />
        ))}
      </Lane>
    </Board>
  );
}

export default App;
