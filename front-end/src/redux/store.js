import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { rootPersistConfig, rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  //   immutableCheck: false
  // }),
  reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

export { store, persistor };
