import { Service } from "typedi";
import { UserRepository } from "@/server/repositories/user";
import { User } from "@/server/entities/user";
import { comparePasswords, hashPassword } from "@/server/utils/password";
import jwt from "jsonwebtoken";
import { CreateUserDTO } from "@/server/dto/create-user";

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await comparePasswords(password, user.password);
    return isValid ? user : null;
  }

  async createUser({ email, password }: CreateUserDTO): Promise<User> {
    const hashedPassword = hashPassword(password);
    const user = new User();
    user.email = email;
    user.password = hashedPassword;
    return this.userRepository.create(user);
  }

  encodeAccessToken = (user: User) => {
    if (!process.env.AUTH_SECRET) {
      throw new Error("AUTH_SECRET is not set");
    }

    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.AUTH_SECRET,
      { expiresIn: "1d" }
    );
  };

  decodeAccessToken = async (accessToken: string) => {
    if (!process.env.AUTH_SECRET) {
      throw new Error("AUTH_SECRET is not set");
    }

    const decoded = jwt.verify(accessToken, process.env.AUTH_SECRET);
    if (
      typeof decoded === "object" &&
      decoded &&
      "email" in decoded &&
      typeof decoded.email === "string"
    ) {
      return await this.userRepository.findByEmail(decoded.email);
    }
  };
}
