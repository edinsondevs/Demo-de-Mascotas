import { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Autocomplete,
    TextField,
    Grid,
    Select,
    SelectChangeEvent,
} from "@mui/material";

import CardVisualization from "./ShowAllCards.tsx";

import { useSelector } from "react-redux";
import { RootState } from "../store/index.tsx";
import { InterfaceDataPets, nameSelected } from "../interfaces/dataPets.tsx";
/**
 *   DECLARACION DE ENUMS
 */
enum pet {
    DOG = "dog",
    CAT = "cat",
    ALL = "all",
}

const AvailablePetsList: React.FC<object> = () => {
    const [typePet, setTypePet] = useState("");
    const petsRegistered = useSelector(
        (state: RootState) => state.petsRegistered.pets
    );

    const [breed, setBreed] = useState<string[]>([]);
    // // const [setDataSelectPets] = useState<string[]>([]);
    const [selectName, setSelectName] = useState<string>("");

    const [dataPets, setDataPets] =
        useState<InterfaceDataPets[]>(petsRegistered);
    const [dataPetsOrigin] = useState<InterfaceDataPets[]>(petsRegistered);

    const numberPetsAdoptedByUser = useSelector(
        (state: RootState) =>
            state.loggedUser.dataUserLogged.userLogged[0].adoptedPets
    ); // ^ TRAIGO DESDE EL STORE LA CANTIDAD DE MASCOTAS ADOPTADAS POR EL USUARIO LOGUEADO

    /**
     ** Funcion que escucha los cambios de TIPO DE MASCOTA
     */
    const handleTypePets = async (event: SelectChangeEvent<string>) => {
        setTypePet(event.target.value);
        const typeBreed = event.target.value;

        // * Si la opcion seleccionada es TODOS
        if (event.target.value === pet.ALL) return setDataPets(dataPetsOrigin);
        setDataPets(dataPetsOrigin.filter((e) => e.type === typeBreed));

        const breeds = dataPetsOrigin
            .filter((e) => e.type === typeBreed)
            .map((e) => e.breed);
        
        const notDuplicateBreed = [...new Set(breeds)];
        setBreed(notDuplicateBreed);
    };

    /**
     ** Funcion que escucha los cambios de las RAZAS de las mascotas
     */
    const handleChangePets = async (event: SelectChangeEvent) => {
        const selectedBreed = event.target.value;
        setSelectName(event.target.value);
        const {
            // // target: { value },
        } = event;
        // // setDataSelectPets(typeof value === "string" ? value.split(",") : value);
        selectedBreed === pet.ALL && typePet !== pet.ALL
            ? setDataPets(dataPetsOrigin.filter((e) => e.type === typePet))
            : selectedBreed === pet.ALL && typePet === pet.ALL
            ? setDataPets(dataPetsOrigin)
            : setDataPets(
                  dataPetsOrigin.filter((e) => e.breed === selectedBreed)
              );
    };

    /**
     ** Funcion que escucha los cambios en los NOMBRES
     */
    const handleChangeName = async (
        event: React.SyntheticEvent,
        reason: nameSelected | null | null,
    ) => {
        console.log(event)
        console.log(reason)
        const nameSelected = reason;
        setDataPets(
            dataPetsOrigin.filter(
                (e) =>
                    e.name === nameSelected?.name &&
                    e.email === nameSelected?.email
            )
        );
    };

    useEffect(() => {
        typePet === pet.ALL ? setBreed([]) : null;
    }, [typePet]);

    useEffect(() => {
        if (!dataPets.length) {
            setDataPets(dataPetsOrigin);
            setTypePet(pet.ALL);
            setSelectName(pet.ALL);
        }
    }, [dataPets, dataPetsOrigin, selectName, typePet]);

    return (
        <Box>
            {numberPetsAdoptedByUser <= 2 && (
                <Grid
                    container
                    item
                    xs={12}
                    textAlign="center"
                    flexDirection="row"
                    sx={{
                        display: "flex",
                        my: 2,
                        "@media (max-width: 768px)": {
                            flexDirection: "column",
                            gap: 2,
                            alignContent: "center",
                            ml: -7,
                        },
                    }}
                >
                    {/** ********************************
                     *    FILTRO DE TIPO DE MASCOTA
                     * ********************************/}
                    <Grid
                        item
                        xs={4}
                        sx={{
                            bgcolor: "white",
                            "@media (max-width: 768px)": {},
                        }}
                    >
                        <FormControl size="small">
                            <InputLabel>Tipo de Mascota</InputLabel>
                            <Select
                                label="Tipo de Mascota"
                                sx={{
                                    width: "15em",
                                }}
                                value={typePet}
                                key={typePet}
                                onChange={handleTypePets}
                            >
                                <MenuItem value={pet.DOG}>Perro</MenuItem>
                                <MenuItem value={pet.CAT}>Gato</MenuItem>
                                <MenuItem value={pet.ALL}>Todos</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/** ********************************
                     *    FILTRO DE RAZAS
                     *  @function - {handleChangePets}
                     * ********************************/}
                    <Grid
                        item
                        xs={4}
                    >
                        <FormControl size="small">
                            <InputLabel>Raza</InputLabel>
                            <Select
                                label="Raza"
                                sx={{ width: "15em" }}
                                value={selectName}
                                onChange={handleChangePets}
                            >
                                <MenuItem value={pet.ALL}>Todos</MenuItem>
                                {breed
                                    ? breed.map((breed) => (
                                          <MenuItem
                                              // key={id}
                                              value={breed}
                                          >
                                              {breed}
                                          </MenuItem>
                                      ))
                                    : null}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/** ********************************
                     *    FILTRO SEARCH DE MASCOTAS
                     * ********************************/}
                    <Grid
                        item
                        xs={4}
                    >
                        <FormControl>
                            <Autocomplete
                                size="small"
                                id="grouped-demo"
                                getOptionLabel={(option) =>
                                    `${option.name} - ${option.type} - ${option.breed}`
                                }
                                options={dataPets}
                                sx={{
                                    width: 300,
                                    "@media (max-width: 768px)": {
                                        width: "15rem",
                                    },
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Buscar Mascota"
                                    />
                                )}
                                onChange={(event, option) =>
                                    handleChangeName(event, option)
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            )}

            <CardVisualization dataPets={dataPets} />
        </Box>
    );
};

export default AvailablePetsList;
