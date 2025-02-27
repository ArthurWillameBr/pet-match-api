import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import crypto from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.items.push(pet);
    return pet;
  }
}
