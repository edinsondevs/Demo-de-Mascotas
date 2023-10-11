import { createSlice } from '@reduxjs/toolkit'
import { UserConnected } from '../../../interfaces/interfacesUsers';

const initialState: UserConnected = {
    email: ""
}

export const userConnected = createSlice({
name: 'conectionUser',
initialState,
reducers: {
    conectionUser: (state, action) =>{
        state.email = action.payload.email;
    }
},

})
export const { conectionUser } = userConnected.actions
export default userConnected.reducer