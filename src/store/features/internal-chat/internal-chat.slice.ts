import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageDto } from 'types';

interface InternalChatState {
  replyMessage?: MessageDto;
}

const initialState: InternalChatState = {};

const internalChatSlice = createSlice({
  name: 'internalChat',
  initialState,
  reducers: {
    setReplyMessage: (state, actions: PayloadAction<MessageDto | undefined>) => {
      state.replyMessage = actions.payload;
    }
  }
});

export const { setReplyMessage } = internalChatSlice.actions;

export const internalChatReducer = internalChatSlice.reducer;
