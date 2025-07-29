export type UserProfile = {
  id: number;
  email: string | null;
  age: number | null;
  stackUserId: string;
  firstName: string | null;
  lastName: string | null;
  headline: string | null;
  summary: string | null;
  location: string | null;
  profilePictureUrl: string | null;
  bannerImageUrl: string | null;
  industry: string | null;
  createdAt: Date;
  updatedAt: Date;
  workExperiences?: WorkExperience[];
  educations?: Education[];
  userSkills?: UserSkill[];
}

export type WorkExperience = {
  id: number;
  stackUserId: string;
  company: string;
  position: string;
  startDate: string; // ISO date string
  endDate: string | null;
  description: string | null;
  isCurrent: boolean;
  createdAt: Date;
}

export type Education = {
  id: number;
  stackUserId: string;
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  startDate: string | null;
  endDate: string | null;
  createdAt: Date;
}

export type Skill = {
  id: number;
  name: string;
  createdAt: Date;
}

export type UserSkill = {
  stackUserId: string;
  skillId: number;
  endorsementCount: number;
  createdAt: Date;
  skill?: Skill;
}

export type UserSettings = {
  stackUserId: string;
  privacyLevel: 'public' | 'connections' | 'private';
  emailNotifications: boolean;
  connectionRequestsOpen: boolean;
  profileVisibility: 'public' | 'connections' | 'private';
  activityBroadcast: boolean;
  themePreference: 'light' | 'dark';
  createdAt: Date;
  updatedAt: Date;
}

export type Post = {
  id: number;
  stackUserId: string;
  content: string;
  imageUrl: string | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: Date;
  updatedAt: Date;
  author?: UserProfile; // For when you fetch posts with author info
}
