import { usePaging } from 'hooks/usePaging';
import { useGetFrequentlyAskedQuestionsQuery } from 'services';
import { FindAllFrequentlyAskedQuestionDto } from 'types';
import { DEFAULT_PAGE_SIZE } from 'utils';
const pageSize = DEFAULT_PAGE_SIZE;
export function useFrequentlyAskedQuestionsPaging(
  params: Omit<FindAllFrequentlyAskedQuestionDto, 'pageIndex' | 'pageSize'>
) {
  const { keyword, isActive, serviceTypeId } = params;
  const { pageIndex, resetPage, changePage } = usePaging(params);

  const {
    data: frequentlyAskedQuestionsRes,
    error,
    isLoading,
    isFetching
  } = useGetFrequentlyAskedQuestionsQuery({
    pageIndex: pageIndex,
    pageSize,
    keyword,
    isActive,
    serviceTypeId
  });

  const handleChangePage = changePage;

  return {
    frequentlyAskedQuestions: frequentlyAskedQuestionsRes?.data.rows || [],
    count: frequentlyAskedQuestionsRes?.data.count || 0,
    pageIndex,
    isLoading: isFetching || isLoading,
    error,
    resetPage,
    handleChangePage
  };
}
