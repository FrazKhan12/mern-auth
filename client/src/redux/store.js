import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import loaderSlice from "./loaderSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  loading: loaderSlice,
});
const persistReducers = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistReducers,
});

export default store;
