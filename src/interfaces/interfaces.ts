export interface UserInterface {
  id: string;
  name: string;
  email: string;
  role: string;
  cart?: {
    cartBooks?: 
      {
        id: string;
        amount: number;
        cartId: string;
        bookId: string;
        book?: Book;
      }[];
    id: string;
    is_ordered: boolean;
    has_paid: boolean;
  };
  favorite?: {
    favoriteBooks?: {
      id: string;
      favoriteId: string;
      bookId: string;
      book?: Book
    }[];
    id: string;
  };
  rating: {
    id: string;
    value: number;
    userId: string;
    bookId: string;
  }[];
  avatar?: {
    id: string, 
    avatarName: string,
    data: string,
  };
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  bookRating: number;
  rating: {
    id: string;
    value: number;
    userId: string;
    bookId: string;
  }[];
  author: {
    id: string;
    author_name: string;
  };
  genreId: string;
  comments: {
    id: string, 
    text: string,
    user?: {
      id: string,
      name: string,
      email: string,
      role: string,
      avatar?: {
        id: string, 
        avatarName: string,
        data: string,
      }
    },
    bookId: string,
    createdAt: string
  }[];
  photo: string;
}
export interface SortOptionsInterface {
  genreId?: {}[];
  priceRange?: number[];
  sort?: string;
}

export interface CartBooks {
  has_paid: boolean;
  is_ordered: boolean;
  amount: number;
  book: Book;
}

export interface Comments {
  id: string, 
  text: string,
  user?: {
    id: string,
    name: string,
    email: string,
    role: string,
    avatar?: {
      id: string, 
      avatarName: string,
      data: string,
    }
  },
  bookId: string,
  createdAt: string
}
