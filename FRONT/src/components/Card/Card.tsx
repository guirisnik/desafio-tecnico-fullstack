import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clear,
  Delete,
  Edit,
} from "@material-ui/icons";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Button,
  CardContainer,
  ContentContainer,
  ControlsContainer,
  Input,
  TextArea,
  TitleContainer,
} from "./styled";

interface CardProps {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
  handleUpdate: Function;
  handleDelete: Function;
  initialEditMode?: boolean;
}

function Card({
  id,
  titulo,
  conteudo,
  lista,
  handleUpdate,
  handleDelete,
  initialEditMode = false,
}: CardProps) {
  const [isEditMode, setEditMode] = useState<boolean>(initialEditMode);

  const [editedTitle, setEditedTitle] = useState<string>(titulo);
  const [editedContent, setEditedContent] = useState<string>(conteudo);

  function onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEditedTitle(e.target.value);
  }

  function onContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setEditedContent(e.target.value);
  }

  function onEdit() {
    setEditMode(true);
  }

  async function onDelete() {
    await handleDelete(id);
  }

  function onCancel() {
    setEditMode(false);
    setEditedTitle(titulo);
    setEditedContent(conteudo);
  }

  async function handleSave() {
    await handleUpdate(id, {
      titulo: editedTitle,
      conteudo: editedContent,
      lista,
    });
    setEditMode(false);
  }

  function shouldDisableMovement(direction: "LEFT" | "RIGHT") {
    if (lista === "ToDo" && direction === "LEFT") return true;
    if (lista === "Done" && direction === "RIGHT") return true;
    return false;
  }

  function nextLeftLane(lista: string) {
    if (lista === "Doing") return "ToDo";
    if (lista === "Done") return "Doing";
    return lista;
  }

  function nextRightLane(lista: string) {
    if (lista === "ToDo") return "Doing";
    if (lista === "Doing") return "Done";
    return lista;
  }

  async function onLeftLaneMovement() {
    await handleUpdate(id, {
      titulo,
      conteudo,
      lista: nextLeftLane(lista),
    });
  }

  async function onRightLaneMovement() {
    await handleUpdate(id, {
      titulo,
      conteudo,
      lista: nextRightLane(lista),
    });
  }

  return (
    <CardContainer>
      <TitleContainer>
        {isEditMode ? (
          <Input
            placeholder="Título"
            value={editedTitle}
            onChange={onTitleChange}
          />
        ) : (
          titulo
        )}
      </TitleContainer>
      <ContentContainer>
        {isEditMode ? (
          <TextArea placeholder="Conteúdo" onChange={onContentChange}>
            {editedContent}
          </TextArea>
        ) : (
          <ReactMarkdown>{conteudo}</ReactMarkdown>
        )}
      </ContentContainer>
      <ControlsContainer>
        {isEditMode ? (
          <>
            <Button onClick={handleSave}>
              <Check />
            </Button>
            <Button onClick={onCancel}>
              <Clear />
            </Button>
          </>
        ) : (
          <>
            <Button
              disabled={shouldDisableMovement("LEFT")}
              onClick={onLeftLaneMovement}
            >
              <ArrowLeft />
            </Button>
            <Button onClick={onEdit}>
              <Edit />
            </Button>
            <Button onClick={onDelete}>
              <Delete />
            </Button>
            <Button
              disabled={shouldDisableMovement("RIGHT")}
              onClick={onRightLaneMovement}
            >
              <ArrowRight />
            </Button>
          </>
        )}
      </ControlsContainer>
    </CardContainer>
  );
}

export { Card };
