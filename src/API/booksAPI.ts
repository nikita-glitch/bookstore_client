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


export default { getBooks };
