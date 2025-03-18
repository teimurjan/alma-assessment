import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@/api/entities/user";
import { Lead } from "@/api/entities/lead";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== "production", // Auto-sync only in dev
  entities: [User, Lead],
});
