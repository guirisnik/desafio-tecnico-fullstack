import { NotFoundException } from "../infrastructure/exceptions/http.exception";
import { Card, CardRequest, CardResponse } from "./cards.dto";

const CardService = {
  async findAll(): Promise<CardResponse[]> {
    const cards = await Card.findAll();
    return cards.map((card) => card.toCardResponse());
  },

  async create(cardRequest: CardRequest): Promise<CardResponse> {
    const card = await Card.create(cardRequest);
    return card.toCardResponse();
  },

  async update(id: string, cardRequest: CardRequest): Promise<CardResponse> {
    const [count] = await Card.update(cardRequest, { where: { id } });
    if (count === 0)
      throw new NotFoundException(`A card with id ${id} was not found`);

    const updatedCard = await Card.findByPk(id);
    return updatedCard.toCardResponse();
  },

  async delete(id: string): Promise<CardResponse> {
    const card = await Card.findByPk(id);
    if (!card)
      throw new NotFoundException(`A card with id ${id} was not found`);

    await Card.destroy({ where: { id } });

    return card.toCardResponse();
  },
};

export default CardService;
