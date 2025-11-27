import { configureStore } from '@reduxjs/toolkit'
import { recipesApi } from '../services/recepies'
import { authApi } from '../services/AuthApi'
import authReducer from './authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      recipesApi.middleware,
      authApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
