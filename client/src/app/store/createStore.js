import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReduser from "./qualities";
import professionsReduser from "./professions";
import usersReduser from "./users";
import commentsReduser from "./comments";

const rootReducer = combineReducers({
    qualities: qualitiesReduser,
    professions: professionsReduser,
    users: usersReduser,
    comments: commentsReduser
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
