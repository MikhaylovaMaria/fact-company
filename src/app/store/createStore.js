import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities";
import professionsReduser from "./professions";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReduser
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
