import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from './slices/preferences'
import logger from 'redux-logger'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default configureStore({
  reducer: {
    preferences: persistReducer(
      {
        key: 'preferences',
        storage,
      },
      preferencesReducer
    ),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})