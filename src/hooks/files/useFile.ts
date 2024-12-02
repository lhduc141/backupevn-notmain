import { useGetFileQuery } from 'services';
export function useFile(fileId?: number) {
  const {
    data: file,
    isError,
    isLoading,
    error
  } = useGetFileQuery(fileId!, {
    skip: !fileId
  });

  return {
    isError,
    isLoading,
    error,
    file: file?.data
  };
}
