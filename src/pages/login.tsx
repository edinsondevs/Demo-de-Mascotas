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
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginMessage, UserRegistrationMessage } from "../common/Messages";
import { validateUser } from "../services/getUserLogin";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedUser } from "../store/slices/sesions/userLoginStore";
import { RootState } from "../store";
import { isRegistered } from "../store/slices/sesions/userRegisteredSuccess";
import "../index.css"


//******************          DEFINICION DE TYPES Y CONSTANTES

type LoginType = {
  email: string;
  login: {
    password: string;
  };
};

//# ******************          INICIO DE MI COMPONENTE

export const LoginPage: React.FC<object> = () => {
  /**
   * Declaro mis funciones para navegar y dispachar acciones
   */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //******************          DECLARACION MANEJO Y USO DE ESTADOS

  const [loginData, setLoginData] = React.useState<LoginType>({
    email: "",
    login: {
      password: "",
    },
  });

  /**
   * Obtengo los estados que necesitamos desde el store
   */
  const user = useSelector((state: RootState) => state.registeredUsers.users);  
  const isRegisteredStore = useSelector(
    (state: RootState) => state.isRegistered.value
  );

  /**
   * Declaro los estados de mi aplicacion
   */
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(isRegisteredStore);

  //******************   FUNCIONES
  /**
   * Cierra el Alert de mensaje de éxito.
   */
  const handleClose = () => {
    setOpen(false);
    dispatch(isRegistered(false));
  };
  /**
   * Cierra el Alert de mensaje de error.
   */
  const handleCloseError = () => {
    setError(false);
  };

  /**
   * Alterna la visibilidad de la contraseña en el campo de contraseña.
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
   * Maneja el evento de clic en el botón de la contraseña.
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
  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const userLogged = await validateUser(loginData, user);
      if (userLogged) {
        dispatch(isLoggedUser({ success: true, userLogged: userLogged }));
        return navigate("/index");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                          <Typography
                              sx={{ mt: 1, mb: 2 }}
                              variant="h6"
                          >
                              {LoginMessage}
                          </Typography>
                          <Box
                              component="form"
                              onSubmit={handleSubmit}
                          >
                              <TextField
                                  margin="normal"
                                  name="email"
                                  autoComplete="current-name"
                                  fullWidth
                                  size="small"
                                  type="text"
                                  label="Email"
                                  sx={{ mt: 2, mb: 1.5 }}
                                  required
                                  value={loginData.email}
                                  autoFocus
                                  onChange={handleEmailChange}
                              />
                              <TextField
                                  margin="normal"
                                  name="password"
                                  type={showPassword ? "text" : "password"}
                                  fullWidth
                                  size="small"
                                  label="Password"
                                  sx={{ mt: 1.5, mb: 1.5 }}
                                  required
                                  value={loginData.login.password}
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
                                          Debe ser un usuario registrado ó
                                          introdujo datos incorrectos
                                      </Alert>
                                  </Snackbar>
                              ) : undefined}

                              {open ? (
                                  <Snackbar
                                      open={open}
                                      autoHideDuration={3000}
                                      onClose={handleClose}
                                      anchorOrigin={{
                                          vertical: "top",
                                          horizontal: "right",
                                      }}
                                  >
                                      <Alert
                                          onClose={handleClose}
                                          severity="success"
                                          sx={{ width: "100%" }}
                                      >
                                          <strong>
                                              Usuario Registrado exitosamente
                                          </strong>
                                      </Alert>
                                  </Snackbar>
                              ) : undefined}

                              {/*          ENVIO SUBMIT         */}
                              <Button
                                  fullWidth
                                  variant="contained"
                                  // size="large"
                                  type="submit"
                              >
                                  {LoginMessage}
                              </Button>
                              <br />
                              <br />
                              <Typography
                                  variant="caption"
                                  component={NavLink}
                                  to={"/register"}
                                  sx={{
                                      textDecoration: "none",
                                      fontWeight:'bold'
                                  }}
                              >
                                  {UserRegistrationMessage}
                              </Typography>
                          </Box>
                      </Paper>
                  </Grid>
              </FormControl>
          </Grid>

      </Container>
  );
};
