import { createSlice } from '@reduxjs/toolkit'
import { DataAdoptionPet } from '../../../interfaces/dataPets'


const initialState: DataAdoptionPet = {
    petsAdopted:[]
}

export const adoptionPet = createSlice({
name: 'adoptionRegistered',
initialState,
reducers: {
    adoptionRegistered :  (state, action )=> {
        state.petsAdopted.push(action.payload)
    }
},

})
//* llamar los reducers creados 
export const { adoptionRegistered } = adoptionPet.actions
export default adoptionPet.reducer