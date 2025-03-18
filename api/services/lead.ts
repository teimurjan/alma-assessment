import { Service } from "typedi";
import { LeadRepository } from "@/api/repositories/lead";
import { Lead } from "@/api/entities/lead";
import { CreateLeadDTO } from "@/api/dto/create-lead";
import { GetLeadsDTO } from "../dto/get-leads-dto";
import { MarkLeadReachedDTO } from "../dto/mark-lead-reached-dto";

@Service()
export class LeadService {
  constructor(private readonly leadRepository: LeadRepository) {}

  async createLead(leadDTO: CreateLeadDTO): Promise<Lead> {
    return this.leadRepository.create(leadDTO as Lead);
  }

  async getAllLeads(leadsDTO: GetLeadsDTO): Promise<Lead[]> {
    return this.leadRepository.find(
      leadsDTO.skip,
      leadsDTO.take,
      leadsDTO.status || undefined,
      leadsDTO.search || undefined
    );
  }

  async markReached(leadDTO: MarkLeadReachedDTO): Promise<Lead> {
    const lead = await this.leadRepository.findById(leadDTO.id);
    if (!lead) {
      throw new Error("Lead not found.");
    }

    lead.status = "REACHED_OUT";
    return await this.leadRepository.update(lead);
  }
}
