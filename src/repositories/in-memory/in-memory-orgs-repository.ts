import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import crypto from "node:crypto";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    return this.items.find((org) => org.email === email) || null;
  }
}
