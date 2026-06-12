import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import {persistStore,persistReducer} from 'redux-persist';
import storageImport from "redux-persist/lib/storage";

const storage = storageImport.default || storageImport;

const persistConfig = {
    key:"root",
    storage
};

const persistedAuthReducer = persistReducer(
    persistConfig,
    authReducer)
export const store = configureStore({
    reducer:{
        auth:persistedAuthReducer
    }
})

export const persistor = persistStore(store);