import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const SALT_LENGTH = 16;
const HASH_LENGTH = 32;

export const hashPassword = (password: string): string => {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const hashed = scryptSync(password, salt, HASH_LENGTH).toString("hex");
  return `${salt}:${hashed}`;
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const [salt, originalHash] = hash.split(":");
  const hashedBuffer = scryptSync(password, salt, HASH_LENGTH);
  const hashedPasswordBuffer = Buffer.from(originalHash, "hex");

  return timingSafeEqual(hashedBuffer, hashedPasswordBuffer);
};
