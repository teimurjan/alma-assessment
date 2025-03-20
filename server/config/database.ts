import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Lead } from "../entities/lead";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== "production", // Auto-sync only in dev
  entities: [User, Lead],
  migrations: ["server/migrations/*.ts"],
  migrationsTableName: "migrations"
});
