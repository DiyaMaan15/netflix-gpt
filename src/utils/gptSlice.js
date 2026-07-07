import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        movieResult: null,
        movieName:null
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch
        },
        addGptMovies: (state, action) => {
            const {movieName , movieResult} = action.payload;
            state.movieResult = movieResult
            state.movieName = movieName
        }
    }
})

export const { toggleGptSearchView , addGptMovies } = gptSlice.actions;

export default gptSlice.reducer