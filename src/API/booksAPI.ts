import { privateRoute } from "./index";

const getBooks = async () => {
 
   const response = await privateRoute.get('/books')
   return response

}

const getBookById = async (bookId: string) => {
  privateRoute.get('')
}

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

// const getBookAuthor = async (bookId: string) => {

// }

export default { getBooks }