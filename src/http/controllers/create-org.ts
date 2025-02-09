import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUseCase } from "@/use-cases/create-org";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    password: z.string(),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  });

  const body = createOrgBodySchema.parse(request.body);

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository();
    const registerUseCase = new CreateOrgUseCase(prismaOrgsRepository);

    const { org } = await registerUseCase.execute(body);
    return reply.status(201).send(org);
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      reply.status(400).send({ message: error.message });
    }
  }
}
