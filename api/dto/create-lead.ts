export interface CreateLeadDTO {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedIn?: string;
  resume: string;
  visaCategory: string[];
  details: string;
}
