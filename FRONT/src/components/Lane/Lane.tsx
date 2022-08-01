import { useState } from "react";
import { AddCircle } from "@material-ui/icons";
import { ReactNode } from "react";
import { CardTemplate } from "../Card";
import { Button, LaneContainer, ListContainer, TitleContainer } from "./styled";

interface LaneProps {
  lista: string;
  handleCreate?: Function;
  children?: ReactNode;
}

function Lane({ lista, handleCreate, children }: LaneProps) {
  const [showTemplate, setShowTemplate] = useState<boolean>(false);

  function handleCreateCard() {
    setShowTemplate(true);
  }

  function dismissTemplate() {
    setShowTemplate(false);
  }

  return (
    <LaneContainer>
      <TitleContainer>{lista}</TitleContainer>
      <ListContainer>
        {children}
        {showTemplate && handleCreate && (
          <CardTemplate
            titulo=""
            conteudo=""
            lista="ToDo"
            handleCreate={handleCreate}
            dismissCallback={dismissTemplate}
          />
        )}
        {handleCreate && (
          <Button onClick={handleCreateCard}>
            <AddCircle /> Adicionar card
          </Button>
        )}
      </ListContainer>
    </LaneContainer>
  );
}

export { Lane };
