import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities";
import professionsReduser from "./professions";
import usersReduser from "./users";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReduser,
    users: usersReduser
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
