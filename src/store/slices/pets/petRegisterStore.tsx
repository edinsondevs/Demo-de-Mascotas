import { createSlice } from "@reduxjs/toolkit";
import { mockDataPets } from "../../../utils/mockDataPets";
import { DataRegistration } from "../../../interfaces/dataPets";

const initialState: DataRegistration = {
    pets: mockDataPets,
    updateAdopted: false,
};

export const petRegistration = createSlice({
    name: "pets",
    initialState,
    reducers: {
        petDataRegistration: (state, action) => {
            state.pets.push(action.payload);
        },
        updateAdopted: (state, action) => {
            const id = action.payload.id;
            const pet = state.pets.find((item) => item.id === id)
            if(pet){
                pet.adopted = action.payload.adopted;
            }else{
                console.error('error al realizar la adopcion')
            }
        },
    },
});
//* llamar los reducers creados
export const { petDataRegistration, updateAdopted } = petRegistration.actions;
export default petRegistration.reducer;
