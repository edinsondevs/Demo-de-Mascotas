import { createSlice } from "@reduxjs/toolkit";
import { AllUsersApp, AllUsers } from "../../../interfaces/interfacesUsers";

const initialState: AllUsersApp = {
    availableUsers: [],
};

export const availableUsers = createSlice({
    name: "allUsersApp",
    initialState,
    reducers: {
        allUsersApp: (state, action) => {
            state.availableUsers = action.payload.map((user: AllUsers) => ({
                email: user.email,
                cell: user.cell,
                phone: user.phone,
                gender: user.gender,
                location: {
                    city: user.location.city,
                    country: user.location.country,
                },
                login: {
                    username: user.login.username,
                    password: user.login.password,
                },
                name: {
                    first: user.name.first,
                    last: user.name.last,
                },
                picture: {
                    medium: user.picture.medium,
                },
            }));
        },
    },
});

export const { allUsersApp } = availableUsers.actions;
export default availableUsers.reducer;
