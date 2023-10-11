import * as React from "react";
import {
    FormControl,
    Select,
    Box,
    Container,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ApiCats from "../components/CatBreeds";
import ApiDogs from "../components/DogBreeds";
import { getCatsAllBreed } from "../services/getCatsByBreed";
import { getDogsAllBreeds } from "../services/getDogsByBreed";
import { Breed } from "../interfaces/dataPets";

enum animals {
    CATS = "cats",
    DOGS = "dogs",
}
const animalName = ["Gatos", "Perros"];

export const HomePage: React.FC<object> = () => {
    const [breed, setBreed] = useState<Breed[] | null>(); // Contiene las razas obtenidas al realizar el fetch
    const [breedSelect, setBreedSelect] = useState<string>(""); // Contiene el dato seleccionado por el usuario
    const { index } = useParams<{ index: string }>(); // Dato recibido por parametro

    useEffect(() => {
        setBreedSelect(""); // Limpio el estado del selector por el cambio de index
        if (index === animals.CATS) {
            const getDataCats = async () => {
                try {
                    const data = await getCatsAllBreed();
                    setBreed(data);
                } catch (error) {
                    console.log(error);
                }
            };
            getDataCats();
        } else {
            const getDataDogs = async () => {
                try {
                    const data = await getDogsAllBreeds();
                    setBreed(data);
                } catch (error) {
                    console.log(error);
                }
            };
            getDataDogs();
        }
    }, [index]);

    return (
        <>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    mt={3}
                    sx={{
                        "@media (max-width: 768px)": {
                            fontSize: "1.7rem",
                        },
                    }}
                >
                    Selecciona una raza de{" "}
                    {index === animals.CATS ? animalName[0] : animalName[1]}
                </Typography>
                <Box
                    textAlign="center"
                    mt={4}
                >
                    <FormControl sx={{ m: 1, width: 250 }}>
                        <Select
                            native
                            value={breedSelect || {}}
                            onChange={(event) => {
                                setBreedSelect(event.target.value as string);
                            }}
                            inputProps={{
                                id: "breed-select",
                                name: "breed",
                            }}
                        >
                            <option
                                aria-label="None"
                                value=""
                            />
                            {breed?.map((breed) => (
                                <option
                                    key={breed.name}
                                    value={breed.id}
                                >
                                    {breed.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                {index === animals.CATS ? (
                    <ApiCats breedSelect={breedSelect} />
                ) : (
                    <ApiDogs breedSelect={breedSelect} />
                )}
            </Container>
        </>
    );
};
