import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from './slices/preferences'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const store = configureStore({
  reducer: {
    preferences: persistReducer(
      {
        key: 'preferences',
        storage,
      },
      preferencesReducer
    ),
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(logger),
})

export const persistor = persistStore(store)
export default store