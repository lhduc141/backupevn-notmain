import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_PAGE_INDEX } from 'utils';

export function usePaging(params: any) {
  const previousParams = useRef(params);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);

  const nextPage = () => setPageIndex((prev) => prev + 1);
  const resetPage = () => setPageIndex(DEFAULT_PAGE_INDEX);
  const changePage = (page: number) => setPageIndex(page);

  useEffect(() => {
    if (!isEqual(previousParams.current, params)) {
      setPageIndex(DEFAULT_PAGE_INDEX);
      previousParams.current = params;
    }
  }, [params]);

  return {
    pageIndex,
    nextPage,
    resetPage,
    changePage
  };
}
