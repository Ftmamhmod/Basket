import { combineReducers, configureStore } from "@reduxjs/toolkit";

import products from "./products/productSlice";
import categories from "./categories/categoriesSlice";
import popup from "./popBob/popBobSlice";
import cart from "./cart/cartSlice";
import auth from "./authSlice/authSlice";
import carousel from "./carouselProducts/carouselProductsSlice";
import categoriesProducts from "./categoryProducts/categoryProductsSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart", "auth"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  products,
  categories,
  popup,
  cart: persistReducer(cartPersistConfig, cart),
  carousel,
  categoriesProducts,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };

export default persistReducer(rootPersistConfig, rootReducer);
