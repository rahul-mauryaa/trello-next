import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
// api imports
import { authApi, boardApi, userApi } from "@/app/redux/api";
import { authReducer, boardReducer } from "./slice";
import {
  PersistConfig,
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// features imports
// import { category, user, article, company } from '@/redux/features/';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

type RootReducer = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  auth: authReducer,
  board: boardReducer,
  [authApi.reducerPath]: authApi.reducer,
  [boardApi.reducerPath]: boardApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

const config: PersistConfig<any> = {
  key: "root",
  storage,
  blacklist: [authApi.reducerPath, boardApi.reducerPath, userApi.reducerPath],
  whitelist: ["auth", "board"],
};

const peristedReducer = persistReducer<RootReducer, AnyAction>(
  config,
  rootReducer
);

const createStore = () =>
  configureStore({
    reducer: peristedReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([authApi.middleware, boardApi.middleware, userApi.middleware]);
    },
  });

export const store = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const persistor = persistStore(store);
