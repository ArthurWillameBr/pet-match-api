import { faker } from "@faker-js/faker";
import { AgeCategory, EnergyLevel, Environment, Size } from "@prisma/client";

interface Overwrite {
  org_id?: string;
  age?: AgeCategory;
  size?: Size;
  energy_level?: EnergyLevel;
  environment?: Environment;
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age:
      overwrite?.age ??
      faker.helpers.arrayElement(["PUPPY", "ADULT", "SENIOR"]),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(["SMALL", "MEDIUM", "LARGE"]),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(["INDOOR", "OUTDOOR", "MIXED"]),
  };
}
