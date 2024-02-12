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
  console.log(bookId);
  
  const response = privateRoute.get("/books/" + bookId);
  return response
};

// const getBookRating = async (bookId: string) => {
//   publicRoute.get('')
// }

// const getBookPhoto = async (bookId: string) => {
//   publicRoute.get('')
// }

// const getBookComments = async (bookId: string) => {

// }

// const getBookGenre = async (bookId: string) => {

// }

// const getBookAuthor = async (authorId: string) => {
//   const response = privateRoute.get('/book-author/author')
//   return response
// }

export default { getBooks };
