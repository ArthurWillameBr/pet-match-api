import request from "supertest";
import { app } from "@/app";
import { describe, it } from "node:test";
import { afterAll, beforeAll, expect } from "vitest";
import { makeOrg } from "@/tests/factories/make-org";

describe("Create org (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create a new org", async () => {
    const response = await request(app.server).post("/orgs").send(makeOrg());

    expect(response.status).toBe(201);
  });
});
