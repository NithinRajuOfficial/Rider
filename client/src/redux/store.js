import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Using localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authUserReducer from "./authSlice"; // Authentication slice
import authCaptainReducer from "./authSliceCaptain";

// Redux Persist Configuration
const persistConfig = {
  key: "root", // Name for storage
  storage, // Store in localStorage
  whitelist: ["authUser", "authCaptain"], // Only persist the auth state
};

// Combine Reducers
const rootReducer = combineReducers({
  authUser: authUserReducer,
  authCaptain: authCaptainReducer,
});

// Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
