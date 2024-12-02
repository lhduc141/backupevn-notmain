import { useProfile } from 'hooks/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShiftMeActiveQuery } from 'services';
import { RootState } from 'store';
import { selectHasSelectShiftPermission, setOpenShift, setRequiredShift } from 'store/features';

export function useGetShiftMeActive() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useProfile();

  const hasSelectShiftPermission = useSelector(selectHasSelectShiftPermission);

  const { error, isError } = useGetShiftMeActiveQuery(undefined, {
    skip: !isAuthenticated || !hasSelectShiftPermission
  });

  const shiftMeActive = useSelector((state: RootState) => state.shifts.shiftMeActive);
  const isLoading = useSelector((state: RootState) => state.shifts.loadingShiftMeActive);
  const isOpen = useSelector((state: RootState) => state.shifts.openShift);
  const isRequiredShift = useSelector((state: RootState) => state.shifts.isRequiredShift);
  useEffect(() => {
    if (error) {
    }
  }, [error]);

  const handleOpen = () => {
    dispatch(setOpenShift(true));
  };

  const handleClose = () => {
    dispatch(setOpenShift(false));
  };

  const handleRequiredShift = (value: boolean) => {
    dispatch(setRequiredShift(value));
  };

  return {
    shiftMeActive,
    isLoading,
    isAuthenticated,
    isRequiredShift: isRequiredShift,
    hasSelectShiftPermission: hasSelectShiftPermission,
    isError,
    isOpen,
    handleOpen,
    handleClose,
    handleRequiredShift,
    error
  };
}
