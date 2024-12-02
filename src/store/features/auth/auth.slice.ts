import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { usersApi } from 'services';

interface AuthState {
  isAuthenticated?: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getUserProfile.matchFulfilled, (state, action) => {
      state.isAuthenticated = true;
    });
  }
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
