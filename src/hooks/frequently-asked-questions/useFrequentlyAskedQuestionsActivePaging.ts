import { usePaging } from 'hooks/usePaging';
import { useGetFrequentlyAskedQuestionsActiveQuery } from 'services';
import { FindAllFrequentlyAskedQuestionDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useFrequentlyAskedQuestionsActivePaging(
  params: Omit<FindAllFrequentlyAskedQuestionDto, 'pageIndex' | 'pageSize' | 'isActive'>
) {
  const { keyword, serviceTypeId } = params;
  const { pageIndex, resetPage, changePage } = usePaging(params);
  const {
    data: frequentlyAskedQuestionsActiveRes,
    error,
    isLoading,
    isFetching
  } = useGetFrequentlyAskedQuestionsActiveQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    serviceTypeId
  });

  const handleChangePage = changePage;

  return {
    frequentlyAskedQuestionsActive: frequentlyAskedQuestionsActiveRes?.data.rows || [],
    count: frequentlyAskedQuestionsActiveRes?.data.count || 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,

    handleChangePage
  };
}
