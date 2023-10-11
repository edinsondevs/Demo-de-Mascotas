import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./components/RegisterUsers.tsx";
import AvailablePetsList from "./pages/adoptionPet";
import NavigationBar from "./components/Navbar";
import PetAdoption from "./pages/petForm.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./store/index.tsx";
import ProtectedRoute from "./features/routes/ProtectedRoute.tsx";


import NotFoundPage from "./pages/notFound.tsx";
import DetailsPet from "./pages/detailsPet.tsx";
import AdoptedPets from "./pages/listAdoptedPets.tsx";
import Index from "./pages/index.tsx";


const paths: Array<string> = [
  "/index",
  "/addpetform",
  "/availablepetslist",
  "/pets/cats",
  "/pets/dogs",
  "/detailspet",
  "/pets/adoptedpets"
];

export const AppRouter: React.FC<object> = () => {
  const location = useLocation();
  const userLogged = useSelector(
    (state: RootState) => state.loggedUser.dataUserLogged.success
  );

  const hideNavigationBar = paths.some((path) => path === location.pathname);
  return (
    <>
      {hideNavigationBar ? <NavigationBar /> : null}
      <div style={{ paddingTop: "64px" }}>
        
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notfound" element={<NotFoundPage />} />
        <Route element={<ProtectedRoute userLogged={userLogged} />} >
          <Route path="/index" element={<Index />} />
          <Route path="/addpetform" element={<PetAdoption />} />
          <Route path="/availablepetslist" element={<AvailablePetsList />} />
          <Route path="/pets/adoptedpets" element={<AdoptedPets />} />
          <Route path="/pets/:index" element={<HomePage />} />
          <Route path="/detailspet" element={<DetailsPet />} />
        </Route>

        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
      </div>
    </>
  );
};
