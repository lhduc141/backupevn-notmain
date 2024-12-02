import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { permissionsApi, shiftsApi } from 'services';
import { UserShiftDto } from 'types';
import { LOCAL_STORAGE_KEY, PERMISSION } from 'utils';

interface ShiftsState {
  shiftMeActive: UserShiftDto | null;
  loadingShiftMeActive: boolean;
  openShift: boolean;
  isRequiredShift: boolean;
  hasSelectShiftPermission: boolean;
}

const initialState: ShiftsState = {
  shiftMeActive: null,
  loadingShiftMeActive: true,
  openShift: false,
  isRequiredShift: false,
  hasSelectShiftPermission: false
};

const shiftsSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    setShiftMeActive: (state, action: PayloadAction<UserShiftDto>) => {
      state.shiftMeActive = action.payload;
    },
    setOpenShift: (state, action: PayloadAction<boolean>) => {
      state.openShift = action.payload;
    },
    setRequiredShift: (state, action: PayloadAction<boolean>) => {
      state.isRequiredShift = action.payload;
    },
    setHasSelectShiftPermission: (state, action: PayloadAction<boolean>) => {
      state.hasSelectShiftPermission = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(shiftsApi.endpoints.getShiftMeActive.matchPending, (state) => {
        state.loadingShiftMeActive = true;
      })
      .addMatcher(shiftsApi.endpoints.getShiftMeActive.matchFulfilled, (state, action) => {
        state.shiftMeActive = action.payload.data;
        state.isRequiredShift = !state.shiftMeActive?.shiftId
          ? !localStorage.getItem(LOCAL_STORAGE_KEY.SHIFT_ACTIVE)
          : false;
        state.loadingShiftMeActive = false;
      })
      .addMatcher(shiftsApi.endpoints.getShiftMeActive.matchRejected, (state, action) => {
        state.shiftMeActive = null;
        state.loadingShiftMeActive = false;
      })
      .addMatcher(shiftsApi.endpoints.getAllShiftsOptions.matchFulfilled, (state, action) => {
        state.isRequiredShift =
          Object.values(action.payload?.data)
            .flat()
            .filter((o) => o.isValid).length > 0
            ? !state.shiftMeActive?.shiftId
            : !localStorage.getItem(LOCAL_STORAGE_KEY.SHIFT_ACTIVE);
      })
      .addMatcher(permissionsApi.endpoints.getMePermissions.matchFulfilled, (state, action) => {
        state.hasSelectShiftPermission = action.payload.data.includes(PERMISSION.SELECT_SHIFT);
      });
  },
  selectors: {
    selectHasSelectShiftPermission: (state) => state.hasSelectShiftPermission
  }
});

export const { setShiftMeActive, setOpenShift, setRequiredShift, setHasSelectShiftPermission } = shiftsSlice.actions;

export default shiftsSlice.reducer;

export const { selectHasSelectShiftPermission } = shiftsSlice.selectors;
