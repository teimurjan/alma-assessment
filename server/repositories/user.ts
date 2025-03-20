import { Service } from "typedi";
import { Repository } from "typeorm";
import { User } from "@/server/entities/user";
import { AppDataSource } from "@/server/config/database";

@Service()
export class UserRepository {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    await this.repo.upsert(user, ["email"]);
    return user;
  }
}
