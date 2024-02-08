export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  authorId: string;
  genreId: string;
  comments: string;
  photo: string;
}