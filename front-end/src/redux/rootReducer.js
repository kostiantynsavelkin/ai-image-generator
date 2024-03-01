import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import botReducer from './slices/bot';
import authJwtReducer from './slices/authJwt';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const authPersistConfig = {
  key: 'authJwt',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated']
};

const rootReducer = combineReducers({
  bot: botReducer,
  authJwt: persistReducer(authPersistConfig, authJwtReducer)
});

export { rootPersistConfig, rootReducer };
