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

export const getBookPhoto = async (bookId: string) => {
  
}

export const getBookComments = async (bookId: string) => {
  const response = privateRoute.get("/books/" + bookId + "/comments");  
  return response
}

export const getBookRating = async (bookId: string) => {
  const response = privateRoute.get("/books/" + bookId + "/rating");  
  return response
}

export default { getBooks };
