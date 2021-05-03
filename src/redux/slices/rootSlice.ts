import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Tester Superhero",
        super_power: "Power to test things",
        comics_appeared_in: "999",
        description: "This description is a tester for tester superhero. Lorem ipsum blah blah."
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseSuperPower: (state, action) => { state.super_power = action.payload },
        chooseComics: (state, action) => { state.comics_appeared_in = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload }
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseSuperPower, chooseComics, chooseDescription } = rootSlice.actions;