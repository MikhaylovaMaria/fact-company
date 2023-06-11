import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReduser, actions } = professionsSlice;

const { professionsReceved, professionsRequesFiled, professionsRequested } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();
            dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequesFiled(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionsByIds = (professionsId) => (state) => {
    if (state.professions.entities) {
        const newProf = state.professions.entities.filter((p) => {
            return professionsId === p._id;
        });
        return newProf;
    }
    return "";
};

export default professionsReduser;
