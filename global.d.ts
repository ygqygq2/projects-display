declare interface Project {
  title: string;
  description: string;
  highlights?: string[];
  stack?: string[];
  thumbnail: string;
  frontend?: string | null;
  backend?: string | null;
}
