import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Stack,
    Typography,
    Modal,
    Avatar,
    Card,
    CardMedia,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { InterfaceDataPets } from "../interfaces/dataPets";
import { adoptionRegistered } from "../store/slices/adoption/adoptionPet";
import { updateAdopted } from "../store/slices/pets/petRegisterStore";

import { adoptedPets } from "../store/slices/sesions/registerUserStore";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import { GetDataUser } from "../features/functions";
import { updateAdoptedPets } from "../store/slices/sesions/userLoginStore";

enum MaxAdopted {
    MAX_ADOPTED = 3,
}

/**
 * # COMPONENTE QUE RENDERIZA LA CARTA DE LA MASCOTA SELECCIONADA PARA ADOPTAR
 */
export default function DetailsPetsAdopted() {
    /**
     * # LLAMADA DE LOS DATOS DEL USUARIOS DESDE EL STORE
     */
    const dataUserAdopted = useSelector((state: RootState) => {
        const user = state.loggedUser.dataUserLogged.userLogged[0];
        return {
            cell: user.cell,
            name: `${user.name.first} ${user.name.last} `,
            picture: user.picture.medium,
            city: user.location.city,
            email: user.email,
            adoptedPets: user.adoptedPets,
        };
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const itemData = location.state?.itemData;

    const [confirmAdopted, setConfirmAdopted] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const styleBox = {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "30%",
        height: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    };

    /**
     *  # FUNCION QUE EJECUTA EL PROCESO DE ADOPCION DE LA MASCOTA
     */
    function processAdoption(
        _event: React.MouseEvent<HTMLButtonElement>,
        itemData: InterfaceDataPets
    ) {
        try {
            const updPets = {
                id: itemData.id,
                adopted: true,
            };
            itemData.dataUserAdopted = dataUserAdopted;
            dispatch(adoptionRegistered(itemData));
            dispatch(adoptedPets(dataUserAdopted));
            dispatch(updateAdoptedPets(dataUserAdopted));
            dispatch(updateAdopted(updPets));
            handleCloseAdopted();
            setConfirmAdopted(true);
            setTimeout(() => {
                setConfirmAdopted(false);
                navigate("/availablepetslist");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    function confirmAdoption() {
        setShowModalConfirm(true);
    }

    function handleCloseConfirm() {
        setConfirmAdopted(false);
    }
    function handleCloseAdopted() {
        setShowModalConfirm(false);
    }

    function goBack() {
        navigate("/availablepetslist");
    }

    return (
        <Box sx={{ pt: "10%" }}>
            {/* //*    MODAL DE CONFIRMACION DE LA ADOPCION  *  */}
            <Modal
                open={showModalConfirm}
                onClose={handleCloseConfirm}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        ...styleBox,
                        "@media (max-width: 768px)": {
                            width: "90%",
                            height: "70%",
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        id="child-modal-title"
                        sx={{
                            "@media (max-width: 768px)": {
                                fontSize: "1.2rem",
                                textAlign: "center",
                            },
                        }}
                    >
                        Confirmación de Adopción de {itemData.name}
                    </Typography>
                    <Typography
                        id="child-modal-description"
                        align="justify"
                        py={7}
                        gutterBottom={true}
                        sx={{
                            my: 4,
                            "@media (max-width: 768px)": {
                                fontSize: "0.8rem",
                            },
                        }}
                    >
                        Adoptar una mascota es una decisión importante y
                        gratificante. Al adoptar, no solo le estás dando una
                        segunda oportunidad a un animal desamparado, sino que
                        también estás brindando amor, compañía y alegría a tu
                        hogar.
                    </Typography>
                    <Stack
                        gap={2}
                        flexDirection="row"
                        justifyContent="space-around"
                    >
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={(event) =>
                                processAdoption(event, itemData)
                            }
                            sx={{
                                "@media (max-width: 768px)": {
                                    fontSize: "small",
                                },
                            }}
                        >
                            Sí, Quiero adoptar a {itemData.name}
                        </Button>
                        <Button
                            color="error"
                            variant="outlined"
                            onClick={handleCloseAdopted}
                            sx={{
                                "@media (max-width: 768px)": {
                                    fontSize: "small",
                                },
                            }}
                        >
                            No
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            {/* //*    MODAL DE AVISO EXITOSO DE LA ADOPCION  *  */}
            <Modal
                open={confirmAdopted}
                onClose={handleCloseAdopted}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box
                    sx={{
                        ...styleBox,
                        "@media (max-width: 768px)": {
                            width: "90%",
                            height: "70%",
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            "@media (max-width: 768px)": {
                                textAlign: "center",
                            },
                        }}
                        id="child-modal-title"
                    >
                        Felicidades acabas de Adoptar a {itemData.name}
                    </Typography>
                    <Typography
                        id="child-modal-description"
                        align="justify"
                        padding={2}
                        gutterBottom={true}
                    ></Typography>
                    <Avatar
                        src={itemData.photo}
                        sx={{ width: 150, height: 150, mb: 5 }}
                    />
                    <Box>
                        <PetsIcon sx={{ fontSize: 48 }} />
                        <PetsIcon sx={{ fontSize: 48 }} />
                    </Box>
                </Box>
            </Modal>
            <Container maxWidth="lg">
                <Card
                    sx={{
                        display: "flex",
                        width: "100%",
                        "@media (max-width: 768px)": {
                            flexDirection: "column",
                            width: "100%",
                        },
                    }}
                >
                    <CardMedia
                        component="img"
                        image={itemData.photo}
                        sx={{
                            width: "500px",
                            height: "500px",
                            borderRadius: "5px",
                            boxShadow: 9,
                            objectFit: "fill",
                            "@media (max-width: 768px)": {
                                width: "100%",
                                height: 300,
                            },
                        }}
                        alt={itemData.name}
                    ></CardMedia>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            "@media (max-width: 768px)": {
                                margin: 0,
                                width: "100%",
                            },
                        }}
                    >
                        <Typography
                            variant="h5"
                            bgcolor="#1976d2"
                            color="white"
                            sx={{ p: 2 }}
                        >
                            Mi nombre es:
                        </Typography>

                        <Typography
                            variant="h6"
                            textAlign="center"
                        >
                            {itemData.name}
                        </Typography>
                        <Accordion
                            defaultExpanded={true}
                            sx={{
                                width: "35vw",
                                "@media (max-width: 768px)": {
                                    width: "100%",
                                },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    pr: 5,
                                    bgcolor: "rgba(56, 54, 54, 0.144)",
                                    "@media (max-width: 768px)": {
                                        pr: 2,
                                        width: "100%",
                                    },
                                }}
                            >
                                <Typography variant="h6">
                                    Conoce más de mí
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box
                                    sx={{
                                        display: "flex",
                                        direction: "row",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Box
                                        component="div"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="button">
                                            Raza:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.breed}
                                        </Typography>
                                        <Typography variant="button">
                                            Sexo:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.sex}
                                        </Typography>
                                        <Typography variant="button">
                                            Edad:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.age}
                                        </Typography>
                                        <Typography variant="button">
                                            Tamaño:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.size}
                                        </Typography>
                                    </Box>
                                    <Box
                                        component="div"
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="button">
                                            Edad:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.age}
                                        </Typography>
                                        <Typography variant="button">
                                            Vacunado:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.vaccinated ? "Sí" : "No"}
                                        </Typography>
                                        <Typography variant="button">
                                            Desparacitado:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.deworming ? "Sí" : "No"}
                                        </Typography>
                                        <Typography variant="button">
                                            Esterilizado:
                                        </Typography>
                                        <Typography variant="body2">
                                            {itemData.sterilized ? "Sí" : "No"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                        <Box>
                            <Accordion
                                sx={{
                                    width: "35vw",
                                    "@media (max-width: 768px)": {
                                        width: "100%",
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        pr: 5,
                                        bgcolor: "rgba(56, 54, 54, 0.144)",
                                        "@media (max-width: 768px)": {
                                            pr: 2,
                                            width: "100%",
                                        },
                                    }}
                                >
                                    <Typography variant="h6">
                                        Conoce más de mi antiguo hogar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            direction: "row",
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                direction: "column",
                                            }}
                                        >
                                            <Typography variant="button">
                                                Nombre
                                            </Typography>
                                            <Typography variant="body2">
                                                {`
                                                  ${
                                                      GetDataUser(
                                                          itemData?.email
                                                      )?.name?.first +
                                                      " " +
                                                      GetDataUser(
                                                          itemData?.email
                                                      )?.name?.last
                                                  }`}
                                            </Typography>
                                            <Typography variant="button">
                                                Telefono:
                                            </Typography>
                                            <Typography variant="body2">
                                                {
                                                    GetDataUser(itemData?.email)
                                                        ?.phone
                                                }
                                            </Typography>
                                            <Typography variant="button">
                                                Celular:
                                            </Typography>
                                            <Typography variant="body2">
                                                {
                                                    GetDataUser(itemData?.email)
                                                        ?.cell
                                                }
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                direction: "row",
                                            }}
                                        >
                                            <Typography variant="button">
                                                Correo:
                                            </Typography>
                                            <Typography variant="body2">
                                                {
                                                    GetDataUser(itemData?.email)
                                                        ?.email
                                                }
                                            </Typography>
                                            <Box
                                                component="div"
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: 100,
                                                }}
                                            >
                                                <Avatar
                                                    src={
                                                        GetDataUser(
                                                            itemData?.email
                                                        )?.picture.medium
                                                    }
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                </Card>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", }}>
                    {itemData.adopted === true ? (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 4 }}
                            disabled
                        >
                            adoptado
                        </Button>
                    ) : dataUserAdopted.adoptedPets ===
                      MaxAdopted.MAX_ADOPTED ? (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 4 }}
                            disabled
                        >
                            Llegaste al Máx de 3 mascotas adoptadas.
                        </Button>
                    ) : (
                        <Button
                            onClick={() => confirmAdoption()}
                            variant={
                                dataUserAdopted.email === itemData.email
                                    ? "outlined"
                                    : "contained"
                            }
                            color={
                                dataUserAdopted.email === itemData.email
                                    ? "error"
                                    : "primary"
                            }
                            disabled={
                                dataUserAdopted.email === itemData.email
                                    ? true
                                    : false
                            }
                            sx={{ my: 4 }}
                        >
                            {dataUserAdopted.email === itemData.email
                                ? "no puedes adoptar tu propia mascota"
                                : "Confirmar Adopción"}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            my: 4,
                        }}
                        onClick={goBack}
                    >
                        Volver
                    </Button>
                </Box>
            </Container>{" "}
        </Box>
    );
}
