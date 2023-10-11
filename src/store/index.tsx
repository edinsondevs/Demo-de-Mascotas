import { configureStore } from '@reduxjs/toolkit'
import loggedUser from './slices/sesions/userLoginStore.tsx'
import registeredUsers from './slices/sesions/registerUserStore.tsx'
import availableUsers from './slices/sesions/allUsers.tsx'
import isRegistered from './slices/sesions/userRegisteredSuccess.tsx'
import validUserStore from './slices/sesions/validUserStore.tsx'
import petRegistration  from './slices/pets/petRegisterStore.tsx'
import adoptionRegistered from './slices/adoption/adoptionPet.tsx'

export const store = configureStore({
    reducer: {
        loggedUser: loggedUser,
        registeredUsers: registeredUsers,
        availableUsers: availableUsers,
        isRegistered: isRegistered,
        validUserStore: validUserStore,
        petsRegistered: petRegistration,
        adoptedPets: adoptionRegistered,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch