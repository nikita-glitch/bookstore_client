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
  author: {
    id: string, 
    author_name: string,
  };
  genreId: string;
  comments: string;
  photo: string;
}
export interface SortOptionsInterface {
  genreId?: {}[];
  priceRange?: number[];
  sort?: string;
}

export interface CartBooks {
  has_paid: boolean,
  is_ordered: boolean,
  amount: number,
  book: Book, 
}