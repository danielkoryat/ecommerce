// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import alertReducer from './alertSlice';
import watchlistReducer from './watchlistSlice';

const reducers = combineReducers({
  user: userReducer,
  category: categoryReducer,
  alert: alertReducer,
  watchlist: watchlistReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'category','watchlist'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      }
    }),
});

export const persistor = persistStore(store); 