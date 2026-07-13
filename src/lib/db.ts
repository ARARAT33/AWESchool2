import { PrismaClient } from '@prisma/client'

let db: any;
try {
  db = new PrismaClient();
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  const noOp = { findMany: async () => [], findFirst: async () => null,
    findUnique: async () => null, create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {}, delete: async () => ({}) };
  db = new Proxy({}, { get: () => noOp });
}
export { db };
