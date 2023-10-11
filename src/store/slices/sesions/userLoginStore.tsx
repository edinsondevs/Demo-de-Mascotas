import { createSlice } from "@reduxjs/toolkit";
import { LoginState } from "../../../interfaces/interfacesUsers";

const initialState: LoginState = {
    dataUserLogged: {
        success: false,
        userLogged: [
            {
                email: "",
                gender: "",
                location: {
                    city: "",
                    country: "",
                },
                login: {
                    username: "",
                    password: "",
                },
                name: {
                    first: "",
                    last: "",
                },
                picture: {
                    medium: "",
                },
                cell: "",
                phone: "",
                adoptedPets: 0
            },
        ],
    },
};

export const loggedUser = createSlice({
    name: "userConnected",
    initialState,
    reducers: {
        isLoggedUser: (state, action) => {
            state.dataUserLogged = action.payload;
        },
        updateAdoptedPets: (state, action) => {
          const userEmail = action.payload.email;
          const email = state.dataUserLogged.userLogged.find(
              (item) => item.email === userEmail
          );
          if (email) {
              email.adoptedPets = action.payload.adoptedPets + 1;
          } else {
              console.log("no existe el usuario");
          }
        }
    },
});
export const { isLoggedUser, updateAdoptedPets } = loggedUser.actions;
export default loggedUser.reducer;
