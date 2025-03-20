import { Lead } from "../entities/lead";

export interface GetLeadsDTO {
  skip: number;
  take: number;
  status: Lead["status"] | null;
  search: string | null;
}
