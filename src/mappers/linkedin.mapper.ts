import { Profile } from "../types/profile";

export function mapLinkedInUserInfo(
  data: any,
  profileUrl: string
): Profile {
  return {
    url: profileUrl,

    name: data.name ?? null,

    headline: null,

    location: null,

    about: null,

    profileImage: data.picture ?? null,

    backgroundImage: null,

    experience: [],

    education: [],

    skills: [],

    certifications: [],

    languages: [],
  };
}