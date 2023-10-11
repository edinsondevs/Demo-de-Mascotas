import {
    Container,
    Grid,
    Paper,
    Box,
    Typography,
    TextField,
    FormControl,
    InputAdornment,
    IconButton,
    AlertTitle,
    Snackbar,
    Avatar,
    Button,
    Alert,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LoginQuestionsMessage,
    NewUserRegistrationMessage,
} from "../common/Messages";

import { getAllUsers } from "../services/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { registeredUsers } from "../store/slices/sesions/registerUserStore";
import { allUsersApp } from "../store/slices/sesions/allUsers";
import { RootState } from "../store";
import { isRegistered } from "../store/slices/sesions/userRegisteredSuccess";

//******************          DEFINICION DE TYPES E INTERFACES

type RegisterType = {
    email: string | undefined;
    login: {
        username?: string;
        password: string;
    };
};

//# ******************          INICIO DE MI COMPONENTE

export const RegisterPage: React.FC<object> = () => {
    //******************* LLAMADAS A FUNCIONES

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //******************* DECLARACION MANEJO Y USO DE ESTADOS
    const [loginData, setLoginData] = React.useState<RegisterType>({
        email: "",
        login: {
            password: "",
        },
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const [error, setError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [userValidate, setUserValidate] = React.useState("");
    const [errorRegisters, setErrorRegisters] = React.useState(false);

    //******************   CARGA INICIAL DE LA PAGINA
    /**
     * Obtengo los estados que necesitamos desde el store
     */
    const allUsersStore = useSelector(
        (state: RootState) => state.availableUsers
    );

    // ! useEffect que carga el store
    /**
     * Cargo el store global con los datos de los 100 usuarios habilitados para registrarse
     */
    useEffect(() => {
        const getUsers = async () => {
            try {
                // Llamo a la funcion para obtener desde la api todos los usuarios
                const response = await getAllUsers();
                /**
                 *  dispatch que agrega todos los usuarios en el store de usuarios habilitados o generales
                 */
                dispatch(allUsersApp(response));
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, [dispatch]);
    /**
     *  Hooks que esta pendiente del cambio de estado en el mail para validar contra la api si existe
     *  verifico en cada cambio del input y valido contra los usuarios que tengo en el store
     *  dawn.pierce@example.com
     */
    useEffect(() => {
        // loginData
        const result = allUsersStore.availableUsers.find(
            (user) => user.email === loginData.email
        );
        result ? setUserValidate(result.picture.medium) : setUserValidate("");
    }, [loginData, allUsersStore]);

    //******************   FUNCIONES
    /**
     * Cierra el diálogo de mensaje de éxito.
     */
    const handleClose = () => {
        setOpen(false);
    };
    /**
     * Cierra el diálogo de mensaje de error.
     */
    const handleCloseError = () => {
        setError(false);
    };
    /**
     * Cierra el diálogo de mensaje de error al registrarse y ya esta .
     */
    const handleCloseErrorregisters = () => {
        setErrorRegisters(false);
    };
    /**
     * Alterna la visibilidad de la contraseña en el campo de contraseña.
     */
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    /**
     * Maneja el evento de clic en el botón de la contraseña.
     */
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    /**
     * Maneja el cambio en el campo de correo electrónico.
     */
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLoginData({ ...loginData, email: value });
    };
    /**
     * Maneja el cambio en el campo de contraseña.
     */
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLoginData({
            ...loginData,
            login: {
                ...loginData.login,
                password: value,
            },
        });
    };
    /**
     * Maneja el envío del formulario de inicio de sesión.
     */
    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const getUser = allUsersStore.availableUsers
                .map((user) => user)
                .filter((e) => e?.email === loginData.email);
            if (getUser.length > 0) {
                /**
                 *  dispatch que agrega al usuario en el store de usuarios registrados
                 */
                dispatch(
                    registeredUsers({
                        email: getUser[0].email,
                        gender: getUser[0].gender,
                        cell: getUser[0].cell,
                        phone: getUser[0].phone,

                        location: {
                            city: getUser[0].location.city,
                            country: getUser[0].location.country,
                        },
                        login: {
                            password: loginData.login.password,
                            username: getUser[0].login.username,
                        },
                        name: {
                            first: getUser[0].name.first,
                            last: getUser[0].name.last,
                        },
                        picture: {
                            medium: getUser[0].picture.medium,
                        },
                        adoptedPets: 0,
                    })
                );
                // Muestra el diálogo de mensaje de éxito, navega al inicio de sesión y reinicia los datos de inicio de sesión.
                dispatch(isRegistered(true));
                setOpen(true);
                navigate("/login");
                setLoginData({ email: "", login: { password: "" } });
            } else {
                // Muestra el diálogo de mensaje de error y reinicia los datos de inicio de sesión.
                setError(true);
                setLoginData({ email: "", login: { password: "" } });
            }
        } catch (error) {
            setLoginData({ email: "", login: { password: "" } });
            setErrorRegisters(true);
        }
    };


    const data = allUsersStore.availableUsers;
    let id = 0;
    const a = data.map((label) => {
        id++;
        return {
            id: id,
            label: label.email,
            name: label.name.first +" " + label.name.last,
        };
    });
    

    //*******************# RENDERIZACION
    return (
        <Container maxWidth="sm">
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: "90vh" }}
            >
                <FormControl
                    sx={{
                        borderRadius: "25px",
                        boxShadow: 9,
                    }}
                    variant="outlined"
                >
                    <Grid item>
                        <Paper sx={{ padding: "1.2em", borderRadius: "25px" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    sx={{ mt: 1, mb: 1 }}
                                    variant="h6"
                                >
                                    Registro
                                </Typography>
                                <Avatar
                                    src={userValidate}
                                    sx={{ width: 70, height: 70 }}
                                />
                            </Box>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    margin="normal"
                                    name="email"
                                    fullWidth
                                    type="text"
                                    size="small"
                                    label="Email"
                                    value={loginData.email}
                                    sx={{ mt: 2, mb: 1.5 }}
                                    required
                                    onChange={handleEmailChange}
                                />
                                <TextField
                                    margin="normal"
                                    name="password"
                                    value={loginData.login.password}
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    size="small"
                                    label="Password"
                                    sx={{ mt: 1.5, mb: 1.5 }}
                                    required
                                    onChange={handlePasswordChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                >
                                    {NewUserRegistrationMessage}
                                </Button>
                                <br />
                                <br />
                                <Typography
                                    variant="caption"
                                    component={NavLink}
                                    to={"/login"}
                                    sx={{
                                        textDecoration: "none",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {LoginQuestionsMessage}
                                </Typography>
                                <Accordion>
                                    <AccordionSummary
                                        sx={{ fontSize: "10px", color: "red" }}
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        Usuarios Validos a efectos del proyecto
                                        demo
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer
                                            sx={{
                                                maxHeight: 250,
                                                "@media (max-width: 768px)": {
                                                    maxHeight: 250,
                                                    maxWidth: 300,
                                                },
                                            }}
                                        >
                                            <Table
                                                stickyHeader
                                                aria-label="sticky table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            sx={{
                                                                backgroundColor:
                                                                    "lightGray",
                                                            }}
                                                        >
                                                            Correo
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                backgroundColor:
                                                                    "lightGray",
                                                                    '@media (max-width: 768px)': {
                                                                        display: "none"
                                                                    }
                                                            }}
                                                        >
                                                            Nombre
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {a.map((column, id) => {
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={id}
                                                            >
                                                                <TableCell>
                                                                    {
                                                                        column.label
                                                                    }
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        "@media (max-width: 768px)":
                                                                            {
                                                                                display:
                                                                                    "none",
                                                                            },
                                                                    }}
                                                                >
                                                                    {
                                                                        column?.name
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>

                                {error ? (
                                    <Snackbar
                                        open={error}
                                        autoHideDuration={3000}
                                        onClose={handleCloseError}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <Alert
                                            onClose={handleCloseError}
                                            severity="error"
                                            sx={{
                                                width: "100%",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Debe ser cliente previo para poder
                                            Registrarse
                                        </Alert>
                                    </Snackbar>
                                ) : null}
                                {errorRegisters ? (
                                    <Snackbar
                                        open={errorRegisters}
                                        autoHideDuration={3000}
                                        onClose={handleCloseErrorregisters}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <Alert
                                            onClose={handleCloseErrorregisters}
                                            severity="error"
                                            sx={{
                                                width: "100%",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Usuario ya Registrado
                                        </Alert>
                                    </Snackbar>
                                ) : undefined}
                            </Box>
                        </Paper>
                    </Grid>
                </FormControl>
                {open ? (
                    <Snackbar
                        transitionDuration={3000}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <Alert
                            onClose={handleClose}
                            severity="success"
                        >
                            <AlertTitle sx={{ textAlign: "center" }}>
                                Felicitaciones te has registrado{" "}
                                <strong> exitosamente </strong>
                            </AlertTitle>
                            Ahora por favor inicia sesión
                        </Alert>
                    </Snackbar>
                ) : undefined}
            </Grid>
        </Container>
    );
};
