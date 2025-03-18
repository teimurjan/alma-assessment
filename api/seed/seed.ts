import { AppDataSource } from "@/api/config/database";
import { UserService } from "@/api/services/user";
import Container from "typedi";

const seed = async () => {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const userService = Container.get(UserService);
  await userService.createUser({
    email: "admin@admin.com",
    password: process.env.ADMIN_PASSWORD,
  });

  console.log('Admin user is created.')
};

seed();
