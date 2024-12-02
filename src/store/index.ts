import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  authApi,
  customerSupportInformationApi,
  filesApi,
  frequentlyAskedQuestionApi,
  internalAnnouncementsApi,
  internalChatApi,
  notesApi,
  notificationsApi,
  optionsApi,
  organizationUnitsApi,
  permissionsApi,
  reasonsApi,
  rolesApi,
  serviceInstructionsApi,
  serviceTypesApi,
  shiftsApi,
  ticketCancelReasonsApi,
  ticketSamplesApi,
  userGroupsApi,
  usersApi,
  vipCustomersApi,
  workingSchedulesApi,
  systemConfigsApi,
  agentMapsApi,
  customersApi
} from 'services';
import { authReducer, internalChatReducer, shiftsReducer, usersReducer } from './features';
import { customerLookupApi } from 'services/customer-lookup';
import { ticketsApi } from 'services/tickets';
import { channelsApi } from 'services/channels';
import { administrativeUnitsApi } from 'services/administrative-units';

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [organizationUnitsApi.reducerPath]: organizationUnitsApi.reducer,
  [userGroupsApi.reducerPath]: userGroupsApi.reducer,
  [permissionsApi.reducerPath]: permissionsApi.reducer,
  [optionsApi.reducerPath]: optionsApi.reducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [customerSupportInformationApi.reducerPath]: customerSupportInformationApi.reducer,
  [serviceTypesApi.reducerPath]: serviceTypesApi.reducer,
  [frequentlyAskedQuestionApi.reducerPath]: frequentlyAskedQuestionApi.reducer,
  [serviceInstructionsApi.reducerPath]: serviceInstructionsApi.reducer,
  [workingSchedulesApi.reducerPath]: workingSchedulesApi.reducer,
  [shiftsApi.reducerPath]: shiftsApi.reducer,
  [reasonsApi.reducerPath]: reasonsApi.reducer,
  [vipCustomersApi.reducerPath]: vipCustomersApi.reducer,
  [internalChatApi.reducerPath]: internalChatApi.reducer,
  [notesApi.reducerPath]: notesApi.reducer,
  [ticketCancelReasonsApi.reducerPath]: ticketCancelReasonsApi.reducer,
  [ticketSamplesApi.reducerPath]: ticketSamplesApi.reducer,
  [internalAnnouncementsApi.reducerPath]: internalAnnouncementsApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
  [systemConfigsApi.reducerPath]: systemConfigsApi.reducer,
  [agentMapsApi.reducerPath]: agentMapsApi.reducer,
  [customerLookupApi.reducerPath]: customerLookupApi.reducer,
  [ticketsApi.reducerPath]: ticketsApi.reducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [administrativeUnitsApi.reducerPath]: administrativeUnitsApi.reducer,
  [customersApi.reducerPath]: customersApi.reducer,

  auth: authReducer,
  users: usersReducer,
  shifts: shiftsReducer,
  internalChat: internalChatReducer
});
const rootReducer = (state: any, action: Action) => {
  if (action.type === 'RESET') {
    //We are calling this RESET, but call what you like!
    state = {};
  }
  return combinedReducer(state, action);
};
export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      authApi.middleware,
      organizationUnitsApi.middleware,
      userGroupsApi.middleware,
      permissionsApi.middleware,
      optionsApi.middleware,
      filesApi.middleware,
      rolesApi.middleware,
      customerSupportInformationApi.middleware,
      serviceTypesApi.middleware,
      frequentlyAskedQuestionApi.middleware,
      serviceInstructionsApi.middleware,
      workingSchedulesApi.middleware,
      shiftsApi.middleware,
      reasonsApi.middleware,
      vipCustomersApi.middleware,
      internalChatApi.middleware,
      notesApi.middleware,
      ticketCancelReasonsApi.middleware,
      ticketSamplesApi.middleware,
      internalAnnouncementsApi.middleware,
      notificationsApi.middleware,
      systemConfigsApi.middleware,
      agentMapsApi.middleware,
      customerLookupApi.middleware,
      ticketsApi.middleware,
      channelsApi.middleware,
      administrativeUnitsApi.middleware,
      customersApi.middleware
    )
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
