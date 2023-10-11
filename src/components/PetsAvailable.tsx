import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Box,
    Collapse,
    IconButton,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
    InterfaceColumnData,
    InterfaceColumnDataUsers,
} from "../interfaces/interfacesTable";
import { InterfacePetsAvailables } from "../interfaces/dataPets";
import { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

/**
 *   @function (GetDataUser) - Retorna todos los datos del usuario recibiendo el email
 */

import { GetDataUser } from "../features/functions";
import { NotDataAvailable } from "./NotDataAvailable";
// import { Divider } from "@mui/joy";

enum widthColumn {
    SMALL = 100,
    MEDIUM = 200,
    LARGE = 300,
}
const columnsPets: InterfaceColumnData[] = [
    {
        width: widthColumn.SMALL,
        label: "Mascota",
        dataKey: "typebreed",
        align: false,
    },
    {
        width: widthColumn.LARGE,
        label: "Name",
        dataKey: "name",
    },
    {
        width: widthColumn.MEDIUM,
        label: "Edad",
        dataKey: "age",
    },
    {
        width: widthColumn.MEDIUM,
        label: "Sexo",
        dataKey: "sex",
    },
    {
        width: widthColumn.MEDIUM,
        label: "Raza",
        dataKey: "breed",
    },
    {
        width: widthColumn.MEDIUM,
        label: "Adoptado",
        dataKey: "adopted",
    },
    {
        width: widthColumn.MEDIUM,
        label: "Tamaño",
        dataKey: "size",
    },
    {
        width: widthColumn.LARGE,
        label: "Foto",
        dataKey: "photo",
    },
];

const columnsUsers: InterfaceColumnDataUsers[] = [
    {
        width: widthColumn.LARGE,
        label: "Perfil",
        dataKey: "perfil",
        align: false,
    },
    {
        width: widthColumn.LARGE,
        label: "Nombre",
        dataKey: "name",
        align: false,
    },
    {
        width: widthColumn.LARGE,
        label: "Correo Electrónico",
        dataKey: "email",
    },
    {
        width: widthColumn.LARGE,
        label: "Teléfono",
        dataKey: "phone",
    },
    {
        width: widthColumn.LARGE,
        label: "Ciudad",
        dataKey: "city",
    },
];
enum Breed {
    "DOG" = "PERRO",
    "CAT" = "GATO",
}
const TypeBreed = ["dog", "cat"];

enum Adopted {
    "Si" = "Si",
    "No" = "No",
}

enum Size {
    "SMALL" = "Pequeño",
    "MEDIUM" = "Mediano",
    "BIG" = "Grande",
}
const SizeType = ["small", "medium", "large"];

enum Sex {
    "MALE" = "Macho",
    "FEMALE" = "Hembra",
}
const SexType = ["male", "female"];

// ^ *************** Configuracion de estilos
const titleCardsStyle = {
    fontWeight: "bold",
    fontSize: "1rem",
};

export default function PetsListingsAvailable() {
    const isMobile = window.innerWidth < 768;
    const [openStates, setOpenStates] = useState<boolean[]>([]);

    const [expanded, setExpanded] = useState<number | false>(false);

    const handleChange =
        (panel: number) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    //^ ************** Stores
    const data = useSelector(
        (state: RootState) => state.adoptedPets.petsAdopted
    );

    function toggleOpenState(index: number) {
        setOpenStates((prevOpenStates) => {
            const newOpenStates = [...prevOpenStates];
            newOpenStates[index] = !newOpenStates[index];
            return newOpenStates;
        });
    }

    function renderTableRow(pet: InterfacePetsAvailables, index: number) {
        const isOpen = openStates[index] || false;

        return (
            <Fragment>
                <TableRow key={pet.id}>
                    <TableCell>
                        <IconButton
                            // aria-label="expand row"
                            size="small"
                            onClick={() => toggleOpenState(index)}
                        >
                            {isOpen ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{ fontWeight: "bold" }}
                    >
                        {pet.type === TypeBreed[0] ? Breed.DOG : Breed.CAT}
                    </TableCell>
                    <TableCell
                        align="center"
                        sx={{ fontWeight: "bold" }}
                    >
                        {pet.name}
                    </TableCell>
                    <TableCell align="center">{pet.age}</TableCell>
                    <TableCell align="center">
                        {pet.sex === SexType[0] ? Sex.MALE : Sex.FEMALE}
                    </TableCell>
                    <TableCell align="center">{pet.breed}</TableCell>
                    <TableCell align="center">
                        {pet.adopted ? Adopted.Si : Adopted.No}
                    </TableCell>
                    <TableCell align="center">
                        {pet.size === SizeType[0]
                            ? Size.SMALL
                            : pet.size === SizeType[1]
                            ? Size.MEDIUM
                            : Size.BIG}
                    </TableCell>
                    <TableCell align="center">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Avatar src={pet.photo} />
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            backgroundColor: "lightgray",
                        }}
                        colSpan={9}
                        key={pet.id}
                    >
                        <Collapse
                            in={isOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <Box sx={{ margin: 1 }}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Datos de Propietario Anterior
                                </Typography>
                                <Table
                                    size="small"
                                    aria-label="purchases"
                                >
                                    <TableHead>
                                        <TableRow>
                                            {columnsUsers.map((column) => (
                                                <TableCell
                                                    key={column.dataKey}
                                                    align={
                                                        column.align
                                                            ? "left"
                                                            : "center"
                                                    }
                                                    style={{
                                                        width: column.width,
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    <Avatar
                                                        src={
                                                            GetDataUser(
                                                                pet.email
                                                            )?.picture.medium
                                                        }
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    GetDataUser(pet.email)?.name
                                                        .first
                                                }{" "}
                                                {
                                                    GetDataUser(pet.email)?.name
                                                        .last
                                                }
                                            </TableCell>
                                            <TableCell align="center">
                                                {GetDataUser(pet.email)?.email}
                                            </TableCell>
                                            <TableCell align="center">
                                                {GetDataUser(pet.email)?.phone}
                                            </TableCell>
                                            <TableCell align="center">
                                                {
                                                    GetDataUser(pet.email)
                                                        ?.location.city
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                >
                                    Datos del Adoptante
                                </Typography>
                                <Table
                                    size="small"
                                    aria-label="purchases"
                                >
                                    <TableHead>
                                        <TableRow>
                                            {columnsUsers.map(
                                                (column, index) => (
                                                    <TableCell
                                                        key={index}
                                                        align={
                                                            column.align
                                                                ? "left"
                                                                : "center"
                                                        }
                                                        style={{
                                                            width: column.width,
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                )
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    <Avatar
                                                        src={
                                                            pet.dataUserAdopted
                                                                ?.picture
                                                        }
                                                    />
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                {pet.dataUserAdopted?.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {pet.dataUserAdopted?.email}
                                            </TableCell>
                                            <TableCell align="center">
                                                {pet.dataUserAdopted?.cell}
                                            </TableCell>
                                            <TableCell align="center">
                                                {pet.dataUserAdopted?.city}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    }

    const renderCards = () => {
        return (
            <>
            
                {data.length === 0 && <NotDataAvailable />}    
                
                {data.map((pet, index) => {
                    return (
                        <Accordion
                            expanded={expanded === index}
                            onChange={handleChange(index)}
                        >
                            <AccordionSummary
                                expandIcon={<KeyboardArrowDownIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography
                                    style={titleCardsStyle}
                                    sx={{
                                        width: "50%",
                                        flexShrink: 0,
                                    }}
                                >
                                    Nombre:
                                    <Typography
                                        sx={{
                                            width: "100%",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {pet.name}
                                    </Typography>
                                </Typography>
                                <Typography
                                    style={titleCardsStyle}
                                    sx={{ width: "33%", flexShrink: 0 }}
                                >
                                    Mascota
                                    <Typography
                                        sx={{ width: "100%", flexShrink: 0 }}
                                    >
                                        {pet.type === TypeBreed[0]
                                            ? Breed.DOG
                                            : Breed.CAT}
                                    </Typography>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* //* Datos de la Mascota */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<KeyboardArrowDownIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography variant="subtitle2">
                                            Datos de la Mascota
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 5,
                                                my: 2,
                                                flexWrap: "wrap",
                                                bgcolor: "#f3f3f3",
                                                p: 2,
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="15%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Edad
                                                </Typography>
                                                <Typography>
                                                    {pet.age}
                                                </Typography>
                                            </Box>
                                            <Box width="20%">
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Sexo
                                                </Typography>
                                                <Typography>
                                                    {" "}
                                                    {pet.sex === SexType[0]
                                                        ? Sex.MALE
                                                        : Sex.FEMALE}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="auto"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Raza
                                                </Typography>
                                                <Typography>
                                                    {pet.breed}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="20%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Adoptado
                                                </Typography>
                                                <Typography>
                                                    {" "}
                                                    {pet.adopted
                                                        ? Adopted.Si
                                                        : Adopted.No}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="50%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Tamaño
                                                </Typography>
                                                <Typography>
                                                    {/* {pet.} */}
                                                    {pet.size === SizeType[0]
                                                        ? Size.SMALL
                                                        : pet.size ===
                                                          SizeType[1]
                                                        ? Size.MEDIUM
                                                        : Size.BIG}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="auto"
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    src={pet.photo}
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                                {/* //* Datos de Propietario Anterior */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<KeyboardArrowDownIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography variant="subtitle2">
                                            Datos de Propietario Anterior
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 5,
                                                flexWrap: "wrap",
                                                bgcolor: "#f3f3f3",
                                                p: 2,
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="50%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Nombre
                                                </Typography>
                                                <Typography>
                                                    {GetDataUser(pet.email)
                                                        ?.name.first +
                                                        " " +
                                                        GetDataUser(pet.email)
                                                            ?.name.last}
                                                </Typography>
                                            </Box>
                                            <Box width="auto">
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Telefono
                                                </Typography>
                                                <Typography>
                                                    {
                                                        GetDataUser(pet.email)
                                                            ?.cell
                                                    }
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="auto"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Correo
                                                </Typography>
                                                <Typography>
                                                    {
                                                        GetDataUser(pet.email)
                                                            ?.email
                                                    }
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="50%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Ciudad
                                                </Typography>
                                                <Typography>
                                                    {" "}
                                                    {
                                                        GetDataUser(pet.email)
                                                            ?.location?.city
                                                    }
                                                </Typography>
                                            </Box>

                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="auto"
                                                alignItems="center"
                                            >
                                                <Avatar
                                                    src={
                                                        GetDataUser(pet.email)
                                                            ?.picture.medium
                                                    }
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                                {/* //* Datos del Adoptante */}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<KeyboardArrowDownIcon />}
                                        // aria-controls=""
                                    >
                                        <Typography variant="subtitle2">
                                            Datos del Adoptante
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: 5,
                                                flexWrap: "wrap",
                                                bgcolor: "#f3f3f3",
                                                p: 2,
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="50%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Nombre
                                                </Typography>
                                                <Typography>
                                                    {pet.dataUserAdopted?.name}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Celular
                                                </Typography>
                                                <Typography>
                                                    {pet.dataUserAdopted?.cell}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Correo
                                                </Typography>
                                                <Typography>
                                                    {pet.dataUserAdopted?.email}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                width="50%"
                                            >
                                                <Typography
                                                    style={titleCardsStyle}
                                                >
                                                    Ciudad
                                                </Typography>
                                                <Typography>
                                                    {pet.dataUserAdopted?.city}
                                                </Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <Avatar
                                                    src={
                                                        pet.dataUserAdopted
                                                            ?.picture
                                                    }
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                    }}
                                                ></Avatar>
                                            </Box>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </>
            
        );
    };

    const renderTable = () => {
        return (
            <>
                {data.length === 0 ? (
                    <NotDataAvailable />
                ) : (
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 50 }} />
                                    {columnsPets.map((column) => (
                                        <TableCell
                                            key={column.dataKey}
                                            align={
                                                column.align ? "left" : "center"
                                            }
                                            style={{ width: column.width }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((pet, index) =>
                                    renderTableRow(pet, index)
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </>
        );
    };

    return isMobile ? renderCards() : renderTable();
}
