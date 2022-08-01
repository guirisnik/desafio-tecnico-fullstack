import { Check, Clear } from "@material-ui/icons";
import { useState } from "react";
import {
  Button,
  CardContainer,
  ContentContainer,
  ControlsContainer,
  TitleContainer,
  Input,
  TextArea,
} from "./styled";

interface CardTemplateProps {
  titulo: string;
  conteudo: string;
  lista: string;
  handleCreate?: Function;
  dismissCallback: Function;
}

function CardTemplate({
  titulo,
  conteudo,
  lista,
  handleCreate,
  dismissCallback,
}: CardTemplateProps) {
  const [editedTitle, setEditedTitle] = useState<string>(titulo);
  const [editedContent, setEditedContent] = useState<string>(conteudo);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEditedTitle(e.target.value);
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setEditedContent(e.target.value);
  }

  function resetProps() {
    setEditedTitle(titulo);
    setEditedContent(conteudo);
  }

  async function handleSave() {
    if (handleCreate)
      await handleCreate({
        titulo: editedTitle,
        conteudo: editedContent,
        lista,
      });
    resetProps();
    dismissCallback();
  }

  async function handleCancel() {
    resetProps();
    dismissCallback();
  }

  return (
    <CardContainer>
      <TitleContainer>
        <Input
          placeholder="Título"
          value={editedTitle}
          onChange={handleTitleChange}
        />
      </TitleContainer>
      <ContentContainer>
        <TextArea placeholder="Conteúdo" onChange={handleContentChange}>
          {editedContent}
        </TextArea>
      </ContentContainer>
      <ControlsContainer>
        <Button onClick={handleSave}>
          <Check />
        </Button>
        <Button onClick={handleCancel}>
          <Clear />
        </Button>
      </ControlsContainer>
    </CardContainer>
  );
}

export { CardTemplate };
