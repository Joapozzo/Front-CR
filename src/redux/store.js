import { combineReducers, configureStore } from "@reduxjs/toolkit"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/lib/persistStore"
import storage from "redux-persist/lib/storage"

import notisReducer from "./Notis/notisSlice"
import planilleroReducer from "./Planillero/planilleroSlice"
import matchesReducer from "./Matches/matchesSlice"
import newUserReducer from "./user/userSlice"

const reducers = combineReducers({
    notis: notisReducer,
    planillero: planilleroReducer,
    match: matchesReducer,
    newUser: newUserReducer
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["notis", "planillero", "match", "newUser"]
}

//al persist se le pasa como segundo parametro los reducers que va a consumir, y los que se guardan en localStorage son los incluidos en la whitelist
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    //Agregar middleware para que no se queje de que el estado no es serializable (por el persist)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store)