import { useEffect, useState } from "react";
import {
    FormControl,
    FormControlLabel,
    Button,
    TextField,
    Box,
    Grid,
    FormGroup,
    Checkbox,
    MenuItem,
    Container,
    Select,
    InputLabel,
    FormHelperText,
    Typography,
    SelectChangeEvent,
    AlertTitle,
    Alert,
    IconButton,
    Stack,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import { Textarea } from "@mui/joy";
import { PetRegistration, PetRegistrationForm } from "../common/Messages";
import { useDispatch, useSelector } from "react-redux";
import { petDataRegistration } from "../store/slices/pets/petRegisterStore";
import { getBreedCats } from "../services/getCatsByBreed";
import { getDogsBreeds } from "../services/getDogsByBreed";
import { InterfaceFormValues } from "../interfaces/interfacesFormValues";
import { RootState } from "../store";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

/**
 *   DECLARACION DE ENUMS
 */
enum pet {
    DOG = "dog",
    CAT = "cat",
}
enum sex {
    HEMBRA = "female",
    MACHO = "male",
}

enum size {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}
/**
 *   DECLARACION DE CONSTANTES
 */
const MIN_AGE = 0;
const MAX_AGE = 50;
const MIN_WEIGHT = 0;
const MAX_WEIGHT = 60;
/**
 * *  INICIO DEL COMPONENTE
 */
const AddForm = () => {
    const dispatch = useDispatch();
    const [breeds, setBreeds] = useState([]);
    const [open, setOpen] = useState(false);
    const [editDisabled, setEditDisabled] = useState(true);
    const navigate = useNavigate();

    const loggedUserEmail = useSelector((state: RootState) => {
        const result = state.loggedUser.dataUserLogged.userLogged[0];
        return {
            email: result.email,
            phone: result.phone,
        };
    });
    const [formValues, setFormValues] = useState<InterfaceFormValues>({
        name: "",
        type: "",
        sex: "",
        size: "",
        photo: "",
        vaccinated: false,
        deworming: false,
        sterilized: false,
        breed: "",
        email: loggedUserEmail.email,
        description: "",
        available: true,
        phone: loggedUserEmail.phone,
    });

    const resetForm = () => {
        setFormValues({
            name: "",
            type: "",
            sex: "",
            age: 0,
            size: "",
            photo: "",
            weight: 0,
            vaccinated: false,
            deworming: false,
            sterilized: false,
            breed: "",
            email: "",
            phone: "",
            description: "",
            available: true,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    async function getPets(value: string) {
        return value == pet.DOG
            ? setBreeds(await getDogsBreeds())
            : setBreeds(await getBreedCats());
    }
    /**
     * Funcion que escucha los cambios de textos
     */
    const handleTextChange = (
        event: React.ChangeEvent<{ name: string; value: string }>
    ) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    /**
     * Funcion que escucha los cambios numericos
     */
    const hadleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: Number(value),
        });
    };

    /**
     * Funcion que escucha los cambios booleanos
     */
    const handleBooleanChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target;
        setFormValues({
            ...formValues,
            [name]: checked,
        });
    };
    /**
     * Funcion que escucha los cambios Selects
     */
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    /**
     * Funcion que Muestra el popup de mascota registrada
     */
    const handleClose = () => {
        setOpen(false);
    };
    /**
     * Funcion que escucha los cambios Selects de Animales
     */
    const handleSelectChangePets = async (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;

        await getPets(value);
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    /**
     * * Funcion que ejecuta el submit del formulario
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(petDataRegistration(formValues));
            setOpen(true);
            resetForm(); //* Resetea el formulario
        } catch (error) {
            console.log(error);
        }
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 18;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 200,
            },
        },
    };

    // * Funcion que habilita la edicion del Telefono
    function editPhone() {
        setEditDisabled(!editDisabled);
    }

    function goBack() {
        navigate("/index");
    }

    return (
        <Box
            component="form"
            sx={{ flexGrow: 1 }}
            onSubmit={handleSubmit}
            height={"60vh"}
        >
            <Container
                maxWidth="md"
                sx={{
                    minHeight: "92vh",
                    display: "flex",
                    flexDirection: "row",

                    "@media (max-width: 768px)": {
                        flexDirection: "column",
                        fontSize: "1rem",
                        gap: 9,
                        maxHeight: "22vh",
                    },
                }}
            >
                {/* //* Titulo del formulario   */}
                <Grid
                    container
                    sx={{
                        mt: 3,
                        boxShadow: 9,
                        borderRadius: "25px",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ height: 2 }}
                    >
                        <Stack>
                            <Typography
                                variant="h4"
                                sx={{
                                    py: 3,
                                    bgcolor: "#1976d2",
                                    color: "#FFFFFF",
                                    borderRadius: "25px 25px 0 0",
                                    textAlign: "center",
                                    "@media (max-width: 768px)": {
                                        fontSize: "1rem",
                                    },
                                }}
                            >
                                {PetRegistrationForm}
                            </Typography>
                            <Divider
                                textAlign="left"
                                sx={{ pt: 2 }}
                            >
                                <Typography
                                    variant="button"
                                    // gutterBottom
                                >
                                    Datos de la Mascota
                                </Typography>
                            </Divider>
                        </Stack>
                    </Grid>
                    {/* //* Datos del formulario   */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 20,
                        }}
                    >
                        {/**
                         * Seccion informativa de la mascota a Registrar:
                         */}
                        <Stack>
                            <FormControl
                                // fullWidth
                                sx={{ width: "15em" }}
                                size="small"
                            >
                                <TextField
                                    type="text"
                                    required
                                    id="name"
                                    size="small"
                                    label="Nombre de la Mascota"
                                    name="name"
                                    value={formValues?.name}
                                    variant="outlined"
                                    helperText="Obligatorio"
                                    // sx={{ width: "15em", ml: 10 }}
                                    onChange={handleTextChange}
                                />
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormControl
                                // fullWidth
                                sx={{ width: "15em" }}
                                size="small"
                            >
                                <InputLabel>Tipo Animal</InputLabel>
                                <Select
                                    label="Tipo Animal"
                                    name="type"
                                    required
                                    value={formValues?.type}
                                    onChange={handleSelectChangePets}
                                >
                                    <MenuItem value={pet.DOG}>Perro</MenuItem>
                                    <MenuItem value={pet.CAT}>Gato</MenuItem>
                                </Select>
                                <FormHelperText>Obligatorio</FormHelperText>
                            </FormControl>
                        </Stack>
                        <Stack>
                            <TextField
                                size="small"
                                type="number"
                                label="Peso Kg"
                                id="weight"
                                required
                                name="weight"
                                value={formValues?.weight}
                                variant="outlined"
                                sx={{ width: "15em" }}
                                inputProps={{
                                    min: MIN_WEIGHT,
                                    max: MAX_WEIGHT,
                                }}
                                helperText="Obligatorio"
                                onChange={hadleNumberChange}
                            />
                        </Stack>
                        <Stack>
                            <FormControl
                                // fullWidth
                                sx={{ width: "15em" }}
                                size="small"
                            >
                                <InputLabel>Raza</InputLabel>
                                <Select
                                    label="Raza"
                                    name="breed"
                                    required
                                    value={formValues?.breed}
                                    onChange={handleSelectChange}
                                    MenuProps={MenuProps}
                                >
                                    {breeds.map(
                                        (breed: {
                                            value: string;
                                            label: string;
                                        }) => (
                                            <MenuItem
                                                key={breed.value}
                                                value={breed.label}
                                            >
                                                {breed.label}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                                <FormHelperText>Obligatorio</FormHelperText>
                            </FormControl>
                        </Stack>
                    </Grid>

                    <Grid
                        xs={12}
                        sm={12}
                        md={6}
                        item
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 20,
                            "@media (max-width: 768px)": {
                                mt: 0,
                            },
                        }}
                    >
                        <Stack>
                            <FormControl
                                fullWidth
                                size="small"
                            >
                                <TextField
                                    type="text"
                                    required
                                    id="photo"
                                    size="small"
                                    label="URL Foto de la Mascota"
                                    name="photo"
                                    value={formValues?.photo}
                                    variant="outlined"
                                    helperText="Obligatorio"
                                    sx={{ width: "15em" }}
                                    onChange={handleTextChange}
                                />
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormControl
                                fullWidth
                                size="small"
                            >
                                <TextField
                                    type="number"
                                    id="age"
                                    size="small"
                                    label="Edad"
                                    name="age"
                                    required
                                    value={formValues?.age}
                                    variant="outlined"
                                    helperText="Obligatorio"
                                    sx={{ width: "15em" }}
                                    onChange={hadleNumberChange}
                                    inputProps={{ min: MIN_AGE, max: MAX_AGE }}
                                />
                            </FormControl>
                        </Stack>
                        <Stack>
                            {" "}
                            <FormControl
                                sx={{ width: "15em" }}
                                size="small"
                            >
                                <InputLabel>Sexo</InputLabel>
                                <Select
                                    label="Sexo"
                                    name="sex"
                                    required
                                    value={formValues?.sex}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value={sex.HEMBRA}>
                                        Hembra
                                    </MenuItem>
                                    <MenuItem value={sex.MACHO}>Macho</MenuItem>
                                </Select>
                                <FormHelperText>Obligatorio</FormHelperText>
                            </FormControl>
                        </Stack>
                        <Stack>
                            <FormControl
                                sx={{ width: "15em" }}
                                size="small"
                            >
                                <InputLabel>Tamaño</InputLabel>
                                <Select
                                    label="Tamaño"
                                    name="size"
                                    required
                                    value={formValues?.size}
                                    onChange={handleSelectChange}
                                >
                                    <MenuItem value={size.SMALL}>
                                        Pequeño
                                    </MenuItem>
                                    <MenuItem value={size.MEDIUM}>
                                        Mediano
                                    </MenuItem>
                                    <MenuItem value={size.LARGE}>
                                        Grande
                                    </MenuItem>
                                </Select>
                                <FormHelperText>Obligatorio</FormHelperText>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Divider></Divider>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Stack>
                            <FormControl>
                                <Textarea
                                    placeholder="Descripción"
                                    value={formValues?.description}
                                    onChange={handleTextChange}
                                    sx={{
                                        width: "40vw",
                                        height: "10vh",
                                        "@media (max-width: 768px)": {
                                            width: "70vw",
                                        },
                                    }}
                                    name="description"
                                    maxRows={4}
                                />
                            </FormControl>
                        </Stack>
                    </Grid>

                    <Grid
                    container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            "@media (max-width: 768px)": {
                                display: "flex",
                                flexDirection: "column",
                                ml:5,                                
                            },
                        }}
                    >
                        <Grid item>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formValues?.vaccinated}
                                            onChange={handleBooleanChange}
                                        />
                                    }
                                    label="Vacunado"
                                    name="vaccinated"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formValues?.deworming}
                                            onChange={handleBooleanChange}
                                        />
                                    }
                                    label="Desparasitado"
                                    name="deworming"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formValues?.sterilized}
                                            onChange={handleBooleanChange}
                                        />
                                    }
                                    label="Esterilizado"
                                    name="sterilized"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{ height: 2, mt: 2 }}
                    >
                        <Stack>
                            <Divider textAlign="left">
                                <Typography variant="button">
                                    Datos del Responsable
                                </Typography>
                            </Divider>
                        </Stack>
                    </Grid>
                    {/* //***********************************  DATOS DEL RESPONSABLE */}
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexDirection: "row",
                            pt: 3,
                            "@media (max-width: 768px)": {
                                flexDirection: "column",
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                                pt: 6,
                            },
                        }}
                    >
                        <Grid item>
                            <TextField
                                type="email"
                                id="email"
                                name="email"
                                size="small"
                                required
                                value={formValues?.email}
                                label="Email"
                                variant="outlined"
                                sx={{
                                    width: "20rem",
                                    "@media (max-width: 768px)": {
                                        width: "15rem",
                                    },
                                }}
                                disabled
                                error={false}
                                onChange={handleTextChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type="tel"
                                id="phone"
                                size="small"
                                required
                                name="phone"
                                value={formValues?.phone}
                                label="Telefono"
                                variant="outlined"
                                sx={{
                                    width: "20rem",
                                    "@media (max-width: 768px)": {
                                        width: "15rem",
                                    },
                                }}
                                helperText={!editDisabled ? "Obligatorio" : " "}
                                disabled={editDisabled}
                                onChange={hadleNumberChange}
                                error={false}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={editPhone}>
                                            <EditIcon />
                                        </IconButton>
                                    ),
                                }}
                            ></TextField>
                        </Grid>
                    </Grid>
                    {/* //*******  BOTONES DE REGISTRO Y RETROCESO */}
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            pb: 4,
                        }}
                        item
                        xs={16}
                        sm={16}
                    >
                        <Grid
                            item
                            xs={8}
                            sm={6}
                            md={6}
                        >
                            {open ? (
                                <Alert
                                    sx={{
                                        mb: 2,
                                        borderRadius: "0 0 25px 25px",
                                    }}
                                    onClose={handleClose}
                                >
                                    <AlertTitle>Success</AlertTitle>
                                    Mascota Registrada Correctamente
                                </Alert>
                            ) : (
                                <Button
                                    variant="contained"
                                    size="small"
                                    type="submit"
                                >
                                    {PetRegistration}
                                </Button>
                            )}
                        </Grid>
                        <Grid
                            item
                        >
                            <Button
                                onClick={goBack}
                                variant="contained"
                                color="primary"
                                size="small"
                            >
                                Volver
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AddForm;
