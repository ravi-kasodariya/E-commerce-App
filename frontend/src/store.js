import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web

// Import your slice reducers
import productReducer from "./features/products/productSlice";
import authReducer from "./features/auth/authSlice";

// Create a combined reducer
const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist these reducers
};

// Apply persistReducer to the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for redux-persist actions
    }),
});

// Create the persistor
export const persistor = persistStore(store);
