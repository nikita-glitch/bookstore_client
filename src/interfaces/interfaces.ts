export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
  cart: Cart;
  favorite: Favorite;
  rating?: Rating[];
  comments: Comments[];
  avatar?: {};
}

export interface UserStateInterface {
  user: UserInterface | null;
  isLoading: boolean;
}

export interface AuthorInterface {
  id: string;
  author_name: string;
}

export interface Genre {
  id: string;
  genre_name: string;
}

export interface Rating {
  id: string;
  value: number;
  userId: string;
  bookId: string;
}

export interface Comments {
  id: string;
  text: string;
  user: UserInterface;
  bookId: string;
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  bookRating: number;
  rating?: Rating[];
  author: AuthorInterface;
  genreId: string;
  comments: Comments[];
  photos: {};
}

export interface BookStateInterface {
  book: Book[] | null;
  total: number;
  isLoading: boolean;
}

export interface SortOptionsInterface {
  genreId?: {}[];
  priceRange?: number[];
  sort?: string;
}

export interface Cart {
  id: string;
  has_paid: boolean;
  is_ordered: boolean;
  cartBooks: CartBooks[];
}

export interface Favorite {
  id: string;
  favoriteBooks: FavoriteBooks[];
}

export interface CartBooks {
  id: string;
  bookId: string;
  cartId: string;
  amount: number;
  book: Book;
}

export interface FavoriteBooks {
  id: string;
  favoriteId: string;
  bookId: string;
  book: Book;
}
