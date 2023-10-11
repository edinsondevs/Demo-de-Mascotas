import { createSlice } from '@reduxjs/toolkit'
import { RegisteredSuccess } from '../../../interfaces/interfacesUsers'

const initialState: RegisteredSuccess = {
    value: false
}

export const registeredSuccess = createSlice({
name: 'counter',
initialState,
reducers: {
//ACA VAN LAS FUNCIONES A REALIZAR
    isRegistered:  (state, action )=> {
        state.value = action.payload
    }
},

})
export const { isRegistered } = registeredSuccess.actions
export default registeredSuccess.reducer