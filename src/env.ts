// src/env.ts
import { config } from "dotenv";
config();
export const DATABASE_URL = process.env.DB_URL!;
