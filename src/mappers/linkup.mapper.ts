import { Profile } from "../types/profile";

export class LinkUpProfileMapper {
  static map(data: any, sourceUrl: string): Profile {
    return {
      url: sourceUrl,

      name:
        data.name ??
        data.full_name ??
        "",

      headline:
        data.headline ??
        data.title ??
        "",

      location:
        data.location ??
        "",

      about:
        data.about ??
        data.summary ??
        "",

      profileImage:
        data.profile_image ??
        data.profileImage ??
        null,

      backgroundImage:
        data.background_image ??
        data.backgroundImage ??
        null,

      experience:
        data.experience ??
        data.experiences ??
        [],

      education:
        data.education ??
        data.educations ??
        [],

      skills:
        data.skills ??
        [],

      certifications:
        data.certifications ??
        [],

      languages:
        data.languages ??
        [],
    };
  }
}