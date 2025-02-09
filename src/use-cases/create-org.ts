import { orgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  password: string;
  whatsapp: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  latitude: number;
  longitude: number;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: orgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    cep,
    city,
    neighborhood,
    password,
    state,
    street,
    whatsapp,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      new OrgAlreadyExistsError();
    }

    const password_hash = await hash(password, 8);

    const org = await this.orgsRepository.create({
      name,
      author_name,
      email,
      password_hash,
      cep,
      city,
      neighborhood,
      state,
      street,
      whatsapp,
      latitude,
      longitude,
    });

    return { org };
  }
}
