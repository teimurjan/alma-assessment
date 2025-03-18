import { Service } from "typedi";
import { Repository } from "typeorm";
import { Lead } from "@/api/entities/lead";
import { AppDataSource } from "@/api/config/database";

@Service()
export class LeadRepository {
  private repo: Repository<Lead>;

  constructor() {
    this.repo = AppDataSource.getRepository(Lead);
  }

  async create(lead: Lead): Promise<Lead> {
    this.repo.save(lead);
    return lead;
  }

  async update(lead: Lead): Promise<Lead> {
    await this.repo.update(lead.id, lead);
    return lead;
  }

  async findById(id: string): Promise<Lead | null> {
    return this.repo.findOne({ where: { id } });
  }

  async find(
    skip?: number,
    take?: number,
    status?: Lead["status"],
    search?: string
  ): Promise<Lead[]> {
    const query = this.repo.createQueryBuilder("lead");

    if (status) {
      query.andWhere("lead.status = :status", { status });
    }

    if (search) {
      query.andWhere(
        "(lead.firstName ILIKE :search OR lead.lastName ILIKE :search)",
        { search: `%${search}%` }
      );
    }

    if (typeof skip === "number") {
      query.skip(skip);
    }

    if (typeof take === "number") {
      query.take(take);
    }

    return query.getMany();
  }
}
