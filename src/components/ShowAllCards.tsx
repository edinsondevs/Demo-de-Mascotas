import {
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Typography,
    Box,
    Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CardVisualizationProps } from "../interfaces/dataPets";
import { useSelector } from "react-redux";
import { RootState } from "../store";

/**
 * # COMPONENTE QUE RENDERIZA LAS CARTAS DE TODAS LAS MASCOTAS PARA ADOPTAR
 */
const CardVisualization = ({ dataPets }: CardVisualizationProps) => {
    const dataUserAdopted = useSelector(
        (state: RootState) => state.loggedUser.dataUserLogged.userLogged[0]
    );

    const adoptedPets = useSelector(
        (state: RootState) => state.adoptedPets.petsAdopted
    );

    const adoptedPetsUser = adoptedPets.filter(
        (item) => item?.dataUserAdopted?.email === dataUserAdopted?.email
    );

    return (
        <Box>
            {dataUserAdopted?.adoptedPets === 3 ? (
                <>
                    <ImageList
                        cols={3}
                        gap={30}
                        sx={{
                            pt: 20,
                            "@media (max-width: 768px)": {
                                display: "flex",
                                flexDirection: "column",
                                pt: 0,
                            },
                        }}
                    >
                        {adoptedPetsUser.map((item, id) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                                key={id}
                                // # LE PASO LOS DATOS DE CADA MASCOTA CON LA PROPIEDAD STATE AL COMPONENTE DETAILPETS
                            >
                                <ImageListItem
                                    key={id}
                                    sx={{
                                        width: 350,
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {item.adopted ? (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                width: 140,
                                                color: "#050505",
                                                position: "absolute",
                                                justifyContent: "center",
                                                display: "flex",
                                                zIndex: 1,
                                                bgcolor:
                                                    "rgba(251, 255, 0, 0.829)",
                                                borderRadius: 2,
                                            }}
                                        >
                                            ADOPTADO
                                        </Typography>
                                    ) : (
                                        ""
                                    )}
                                    <img
                                        src={`${item.photo}`}
                                        alt={`${item.photo}`}
                                        loading="lazy"
                                        style={{
                                            objectFit: "fill",
                                            height: 300,
                                            borderRadius: 25,
                                        }}
                                    />

                                    <ImageListItemBar
                                        sx={{
                                            borderEndEndRadius: 25,
                                            borderEndStartRadius: 25,
                                        }}
                                        title={`Nombre: ${item.name}`}
                                        subtitle={`Raza: ${item.breed}`}
                                    />
                                </ImageListItem>
                            </Box>
                        ))}
                    </ImageList>

                    <Typography
                        textAlign="center"
                        variant="h3"
                        color="red"
                        pt={10}
                        sx={{
                            "@media (max-width: 768px)": {
                                fontSize: "2rem",
                                pt: 0,
                                pb: 6,
                            },
                        }}
                    >
                        No puedes adoptar mas mascotas
                    </Typography>
                </>
            ) : (
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "@media (max-width: 768px)": {
                            flexDirection: "row",
                            flexWrap: "wrap",
                        },
                    }}
                >
                    <Grid item>
                        <Typography variant="h6">
                            {" "}
                            Mascotas para Adoptar{" "}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            display: "flex",
                        }}
                    >
                        <ImageList
                            cols={4}
                            gap={30}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            {dataPets?.map((item, id) => (
                                <Box
                                    key={id}
                                    component={Link}
                                    to="/detailspet"
                                    state={{
                                        itemData: item,
                                    }}
                                    // # LE PASO LOS DATOS DE CADA MASCOTA CON LA PROPIEDAD STATE AL COMPONENTE DETAILPETS
                                >
                                    <ImageListItem
                                        key={item.photo}
                                        sx={{
                                            width: 350,
                                            position: "relative",
                                            display: "flex",
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        {item.adopted ? (
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    width: 140,
                                                    color: "#050505",
                                                    position: "absolute",
                                                    justifyContent: "center",
                                                    display: "flex",
                                                    zIndex: 1,
                                                    bgcolor:
                                                        "rgba(251, 255, 0, 0.829)",
                                                    borderRadius: "0 25px 0 0",
                                                }}
                                            >
                                                ADOPTADO
                                            </Typography>
                                        ) : (
                                            ""
                                        )}

                                        {!item.photo ? (
                                            <Skeleton
                                                animation="wave"
                                                variant="rectangular"
                                                width={350}
                                                height={300}
                                                sx={{
                                                    borderRadius: 5,
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={`${item.photo}`}
                                                alt={`${item.photo}`}
                                                loading="lazy"
                                                style={{
                                                    objectFit: "fill",
                                                    height: 300,
                                                    borderRadius: 25,
                                                }}
                                            />
                                        )}
                                        
                                        <ImageListItemBar
                                            sx={{
                                                borderEndEndRadius: 25,
                                                borderEndStartRadius: 25,
                                            }}
                                            title={`Nombre: ${item.name}`}
                                            subtitle={`Raza: ${item.breed}`}
                                        />
                                    </ImageListItem>
                                </Box>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default CardVisualization;
