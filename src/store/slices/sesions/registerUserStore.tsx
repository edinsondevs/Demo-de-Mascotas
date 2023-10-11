import { createSlice } from "@reduxjs/toolkit";
import { NewUserRegistration } from "../../../interfaces/interfacesUsers";

const initialState: {
    newUserRegistration: NewUserRegistration;
} = {
    newUserRegistration: {
        users: [],
    },
};

export const newUserRegistration = createSlice({
    name: "newUserRegistration",
    initialState: initialState.newUserRegistration,
    reducers: {
        registeredUsers: (state, action) => {
            const existingUserIndex = state.users.find(
                (user) => user.email === action.payload.email
            );
            if (existingUserIndex) {
                throw new Error();
            } else {
                state.users.push({
                    email: action.payload.email,
                    gender: action.payload.gender,
                    cell: action.payload.cell,
                    phone: action.payload.phone,
                    location: {
                        city: action.payload.location.city,
                        country: action.payload.location.country,
                    },
                    login: {
                        username: action.payload.login.username,
                        password: action.payload.login.password,
                    },
                    name: {
                        first: action.payload.name.first,
                        last: action.payload.name.last,
                    },
                    picture: {
                        medium: action.payload.picture.medium,
                    },
                    adoptedPets: action.payload.adoptedPets,
                });
            }
        },
        adoptedPets: (state, action) => {
            const userEmail = action.payload.email;
            const email = state.users.find((item) => item.email === userEmail);
            if (email) {
                email.adoptedPets = action.payload.adoptedPets + 1;
            } else {
                console.log("no existe el usuario");
            }
        },
    },
});
export const { registeredUsers, adoptedPets } = newUserRegistration.actions;
export default newUserRegistration.reducer;
