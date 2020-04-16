import { useState } from 'react';
import { NEXT, PREV } from '../../constants/pagination';

const usePagination = initialPage => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginate = operator => {
    if (operator === NEXT) {
      setCurrentPage(currentPage + 1);
    } else if (operator === PREV) {
      setCurrentPage(currentPage - 1);
    }
  };

  return [currentPage, paginate];
};

export default usePagination;