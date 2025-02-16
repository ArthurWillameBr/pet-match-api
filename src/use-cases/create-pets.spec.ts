import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { beforeAll, describe, expect, it } from "vitest";
import { CreatePetsUseCase } from "./create-pets";
import { makePet } from "@/tests/factories/make-pet";
import { makeOrg } from "@/tests/factories/make-org";

describe("Create pets use case", () => {
  let petsRepository: InMemoryPetsRepository;
  let orgsRepository: InMemoryOrgsRepository;
  let sut: CreatePetsUseCase;

  beforeAll(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetsUseCase(petsRepository, orgsRepository);
  });

  it("should be able to create a new pet", async () => {
    const org = await orgsRepository.create(makeOrg());
    const { pet } = await sut.execute(makePet({ org_id: org.id }));

    expect(petsRepository.items).toHaveLength(1);
    expect(pet.id).toEqual(expect.any(String));
  });
});
