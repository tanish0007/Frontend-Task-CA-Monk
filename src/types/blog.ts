export interface Blog {
  id: string;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
  author?: {
    name: string;
    role: string;
    image: string;
  };
}

export interface CreateBlogInput {
  title: string;
  category: string[];
  description: string;
  coverImage: string;
  content: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}