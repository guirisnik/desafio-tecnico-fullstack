import { DataTypes, Model } from "sequelize";
import { BadRequestException } from "../infrastructure/exceptions/http.exception";
import { sequelize } from "../infrastructure/database";

export class Card extends Model {
  declare readonly id: string;
  declare readonly titulo: string;
  declare readonly conteudo: string;
  declare readonly lista: string;

  toCardResponse(): CardResponse {
    return {
      id: this.id,
      titulo: this.titulo,
      conteudo: this.conteudo,
      lista: this.lista,
    };
  }
}

Card.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lista: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

export type CardResponse = Pick<Card, "id" | "titulo" | "conteudo" | "lista">;

export function isCard(card: any): card is Card {
  if (!("titulo" in card)) return false;
  if (!("conteudo" in card)) return false;
  if (!("lista" in card)) return false;
  if (!("id" in card)) return false;
  return true;
}

export type CardRequest = Omit<CardResponse, "id">;

export function isCardRequest(cardRequest: any): cardRequest is CardRequest {
  const validationErrors = [];
  if (!("titulo" in cardRequest)) validationErrors.push("titulo is missing");
  if (!("conteudo" in cardRequest))
    validationErrors.push("conteudo is missing");
  if (!("lista" in cardRequest)) validationErrors.push("lista is missing");
  if ("id" in cardRequest)
    validationErrors.push("id must not be sent through a request");
  if (validationErrors.length > 0)
    throw new BadRequestException(validationErrors);
  return true;
}
