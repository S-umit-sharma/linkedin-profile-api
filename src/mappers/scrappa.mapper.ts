import {
  Profile,
  Experience,
  Education,
  Certification,
  Language,
} from "../types/profile";

export class ScrappaProfileMapper {
  static map(data: any, sourceUrl: string): Profile {
    return {
      url: sourceUrl,

      name: data.name ?? null,

      headline: data.headline ?? null,

      location: data.location ?? null,

      about: data.about ?? null,

      profileImage:
        data.image ??
        data.profile_image ??
        null,

      backgroundImage:
        data.background_image ??
        data.backgroundImage ??
        null,

      experience: this.mapExperience(
        data.experience ?? []
      ),

      education: this.mapEducation(
        data.education ?? []
      ),

      skills: this.mapSkills(
        data.skills ?? []
      ),

      certifications: this.mapCertifications(
        data.certifications ?? []
      ),

      languages: this.mapLanguages(
        data.languages ?? []
      ),
    };
  }

  private static toStringOrNull(
  value: unknown
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  return String(value);
}
  

  private static mapExperience(
    items: any[]
  ): Experience[] {
    return items.map((item) => ({
      title: item.title ?? null,

      company: item.company ?? null,

      location: item.location ?? null,

      employmentType:
        item.employment_type ??
        item.employmentType ??
        null,

     startDate: this.toStringOrNull(
  item.start_date ?? item.startDate
),

endDate: this.toStringOrNull(
  item.end_date ?? item.endDate
),

      description:
        item.description ??
        null,
    }));
  }

  private static mapEducation(
    items: any[]
  ): Education[] {
    return items.map((item) => ({
      institution:
        item.school ??
        item.institution ??
        null,

      degree:
        item.degree ??
        null,

      fieldOfStudy:
        item.field_of_study ??
        item.fieldOfStudy ??
        null,

      startDate: this.toStringOrNull(
  item.start_date ?? item.startDate
),

endDate: this.toStringOrNull(
  item.end_date ?? item.endDate
),
      description:
        item.description ??
        null,
    }));
  }

  private static mapSkills(
    items: any[]
  ): string[] {
    return items
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return item.name ?? item.skill ?? null;
      })
      .filter(
        (skill): skill is string =>
          typeof skill === "string"
      );
  }

  private static mapCertifications(
    items: any[]
  ): Certification[] {
    return items.map((item) => ({
      name:
        item.name ??
        null,

      issuingOrganization:
        item.issuing_organization ??
        item.issuingOrganization ??
        item.organization ??
        null,

      issueDate:
        item.issue_date ??
        item.issueDate ??
        null,

      expirationDate:
        item.expiration_date ??
        item.expirationDate ??
        null,

      credentialId:
        item.credential_id ??
        item.credentialId ??
        null,

      credentialUrl:
        item.credential_url ??
        item.credentialUrl ??
        null,
    }));
  }

  private static mapLanguages(
    items: any[]
  ): Language[] {
    return items.map((item) => ({
      name:
        typeof item === "string"
          ? item
          : item.name ?? null,

      proficiency:
        typeof item === "object"
          ? item.proficiency ?? null
          : null,
    }));
  }

  
}