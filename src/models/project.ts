export type Project = {
  id: string;
  title: string;
  description?: string;
  category: string;
  dateInitiated: string;
  datePublished: string;
  images: string[];
  videos?: string[];
  link?: string;
  stackUsed: string[];
  createdDate: string;
  modifiedDate?: string | null;
};
