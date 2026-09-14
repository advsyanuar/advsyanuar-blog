export type Biography = {
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBitrh: string;
    domicile: string;
    nationality: string;
    languages: string[];
    professionalSummary: string;
    experiences: BiographyExperience[];
    educations: BiographyEducation[];
    certifications: BiographyCertification[];
    skills: BiographySkill[];
    projects?: BiographyProject[];
    awards?: BiographyAward[];
    publications?: BiographyPublication[];
}

export type BiographyExperience = {
    yearRange: string;
    company: string;
    responsibilities: string[];
    role: string;
    techStacks: string[];
}

export type BiographyEducation = {
    yearRange: string;
    degree: string;
    school: string;
    gpa: string;
}

export type BiographyCertification = {
    year: string;
    name: string;
    issuer: string;
    credentialLink: string;
}

export type BiographySkill = {
    category: string;
    skills: string[];
}

export type BiographyProject = {
    yearRange: string;
    name: string;
    description: string;
    link: string;
}

export type BiographyAward = {
    year: string;
    name: string;
    issuer: string;
}

export type BiographyPublication = {
    year: string;
    title: string;
    url: string;
}
