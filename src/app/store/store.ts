/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postData from "./features/posts/postData";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { commentApis } from "./apis/comments/api";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, item: string) {
      return Promise.resolve(item);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["commentApis"],
};
const reducers = combineReducers({
  post: postData,
  [commentApis.reducerPath]: commentApis.reducer,
});
const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(commentApis.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persisor = persistStore(store);
