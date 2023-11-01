import { PageData } from '../../shared/types';

export const switchPage = (pageData: PageData, destination: string) => {
  let newCurrentPage;

  switch (destination) {
    case 'firstPage':
      newCurrentPage = 1;
      break;
    case 'lastPage':
      newCurrentPage = pageData.pagesQty;
      break;
    case 'nextPage':
      newCurrentPage = pageData.currentPage + 1;
      break;
    case 'prevPage':
      newCurrentPage = pageData.currentPage - 1;
      break;
    default:
      newCurrentPage = pageData.currentPage;
      break;
  }

  return newCurrentPage;
};
