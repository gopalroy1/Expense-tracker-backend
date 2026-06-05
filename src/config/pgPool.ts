import { Pool } from 'pg';

// Strip Prisma-specific ?schema= param — pg connection strings don't use it
const connectionString = process.env.DATABASE_URL?.split('?')[0];

export const pool = new Pool({ connectionString });
