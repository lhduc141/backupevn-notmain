import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersApi } from 'services';
import { UserDto, UserPermissionsDto } from 'types';
import { LOCAL_STORAGE_KEY } from 'utils';

interface UsersState {
  users: UserDto[];
  loading: boolean;
  count: number;

  userProfile: UserDto | null;
  loadingUserProfile: boolean;
  userProfilePermissions: UserPermissionsDto | null;
  loadingUserProfilePermissions: boolean;

  user: UserDto | null;
  loadingUser: boolean;
  userPermissions: UserPermissionsDto | null;
  loadingUserPermissions: boolean;

  userPermissionIds: number[];
}

const initialState: UsersState = {
  users: [],
  loading: false,
  count: 0,

  userProfile: null,
  loadingUserProfile: !!localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
  userProfilePermissions: null,
  loadingUserProfilePermissions: false,

  user: null,
  loadingUser: false,
  userPermissions: null,
  loadingUserPermissions: false,

  userPermissionIds: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    //user-profile
    setUserProfile: (state, action: PayloadAction<UserDto>) => {
      state.userProfile = action.payload;
    },
    setLoadingUserProfile: (state, action: PayloadAction<boolean>) => {
      state.loadingUserProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
    setUserProfilePermissions: (state, action: PayloadAction<UserPermissionsDto>) => {
      state.userProfilePermissions = action.payload;
    },
    clearUserProfilePermissions: (state) => {
      state.userProfilePermissions = null;
    },
    setUserPermissionIds: (state, action: PayloadAction<number[]>) => {
      state.userPermissionIds = action.payload;
    }
  },
  extraReducers: (builder) => {
    //user-profile
    builder
      .addMatcher(usersApi.endpoints.getUserProfile.matchPending, (state) => {
        state.loadingUserProfile = true;
      })
      .addMatcher(usersApi.endpoints.getUserProfile.matchFulfilled, (state, action) => {
        state.userProfile = action.payload.data;
        state.loadingUserProfile = false;
      });

    builder
      .addMatcher(usersApi.endpoints.getUserProfilePermissions.matchPending, (state) => {
        state.loadingUserProfilePermissions = true;
      })
      .addMatcher(usersApi.endpoints.getUserProfilePermissions.matchFulfilled, (state, action) => {
        state.userProfilePermissions = action.payload.data;
        state.loadingUserProfilePermissions = false;
      });
  },
  selectors: {
    selectUserProfile: (state) => state.userProfile,
    selectUserPemissionIds: (state) => state.userPermissionIds
  }
});

export const {
  setUserProfile,
  setLoadingUserProfile,
  clearUserProfile,
  setUserProfilePermissions,
  clearUserProfilePermissions,
  setUserPermissionIds
} = usersSlice.actions;

export default usersSlice.reducer;

export const { selectUserProfile, selectUserPemissionIds } = usersSlice.selectors;
