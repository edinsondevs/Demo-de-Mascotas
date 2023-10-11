import * as React from "react";
import { Box } from "@mui/material";
import AvailablePetsList from "../components/PetsNotAdopted";

const PetAdoption: React.FC<object> = () => {
  return (
    <Box>
      <AvailablePetsList />
    </Box>
  );
};

export default PetAdoption;
