import { SortOptionsInterface } from "../interfaces/interfaces";
import { privateRoute } from "./index";

const getBooks = async (
  paginationOffset: number,
  searchString?: string,
  sortOptions?: SortOptionsInterface
) => {
  const response = await privateRoute.get("/books", {
    params: {
      paginationOffset: paginationOffset,
      searchString: searchString,
      sortOptions: sortOptions,
    },
  });
  return response;
};

export const getBookById = async (bookId: string) => {

  const response = privateRoute.get("/books/" + bookId);  
  return response
};

const getBookRating = async (bookId: string) => {
  privateRoute.get('')
}

const getBookPhoto = async (bookId: string) => {
  privateRoute.get('')
}

const getBookComments = async (bookId: string) => {
}

export default { getBooks };
