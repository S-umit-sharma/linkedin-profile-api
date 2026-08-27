export interface Experience {
  title: string | null;
  company: string | null;
  location: string | null;
  employmentType: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
}

export interface Education {
  institution: string | null;
  degree: string | null;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
}

export interface Certification {
  name: string | null;
  issuingOrganization: string | null;
  issueDate: string | null;
  expirationDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
}

export interface Language {
  name: string | null;
  proficiency: string | null;
}

export interface Profile {
  url: string;
  name: string | null;
  headline: string | null;
  location: string | null;
  about: string | null;
  profileImage: string | null;
  backgroundImage: string | null;

  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  languages: Language[];
}

export interface ProfileResponse {
  success: boolean;

  profile: Profile;

  metadata: {
    source: string;
    retrievedAt: string;
    availableFields: string[];
  };
}