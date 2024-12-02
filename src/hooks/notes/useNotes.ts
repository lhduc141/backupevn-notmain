import { useGetNotesQuery } from 'services';
export function useNotes() {
  const { data: notesResponse, error, isLoading } = useGetNotesQuery();

  return {
    note: notesResponse?.data,
    isLoading,
    error
  };
}
