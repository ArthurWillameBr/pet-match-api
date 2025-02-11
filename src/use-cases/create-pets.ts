import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import {
  AgeCategory,
  EnergyLevel,
  Environment,
  Pet,
  Size,
} from "@prisma/client";
import { OrgNotFoundError } from "./errors/org-not-found-error";

interface CreatePetsUseCaseRequest {
  name: string;
  about: string;
  org_id: string;
  age: AgeCategory;
  size: Size;
  energy_level: EnergyLevel;
  environment: Environment;
}

interface CreatePetsUseCaseResponse {
  pet: Pet;
}

export class CreatePetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    name,
    about,
    age,
    energy_level,
    environment,
    size,
    org_id,
  }: CreatePetsUseCaseRequest): Promise<CreatePetsUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id);

    if (!org) {
      throw new OrgNotFoundError();
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy_level,
      environment,
      size,
      org_id,
    });

    return {
      pet,
    };
  }
}
