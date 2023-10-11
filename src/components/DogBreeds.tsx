import * as React from "react";
import {
    ImageList,
    Box,
    Container,
    ImageListItem,
    Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { imageSearchNotFoundDogs } from "../config/Variables";
import { getDogsByBreed, getDogsBreedsById } from "../services/getDogsByBreed";
import { ItemMapSelected } from "../interfaces/dataPets";
import { Card, CardContent, Typography } from "@mui/joy";
import { DetailsDogs } from "../interfaces/dataPets";

const ApiDogs: React.FC<{ breedSelect: string }> = ({ breedSelect }) => {
    const [dataSearch, setDataSearch] = useState([]); // Contiene los datos filtrados por la seleccion del usuario
    const [detailsDogs, setDetailsDogs] = useState<DetailsDogs>({
        id: 0,
        name: "",
        bred_for: "",
        breed_group: "",
        life_span: "",
        temperament: "",
        reference_image_id: "",
        description: "",
        weight: {
            imperial: "",
            metric: "",
        },
        height: {
            imperial: "",
            metric: "",
        },
    }); // Cont
    useEffect(() => {
        const getData = async () => {
            if (breedSelect) {
                try {
                    const dataDogs = await getDogsByBreed(breedSelect);
                    setDataSearch(dataDogs);
                    const getDetailsDogs = await getDogsBreedsById(breedSelect);
                    setDetailsDogs(getDetailsDogs);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getData();
    }, [breedSelect]);

    return (
        <>
            {breedSelect && (
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            "@media (max-width: 768px)": {
                                flexDirection: "column",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                // '@media (max-width: 768px)': {
                                //     flexDirection: "row"
                                // }
                            }}
                        >
                            <CardContent
                                sx={{
                                    width: "35rem",
                                    display: "flex",
                                    "@media (max-width: 768px)": {
                                        width: "20rem",
                                    },
                                }}
                            >
                                <Typography variant="soft">
                                    Temperamento:
                                </Typography>
                                <Typography>
                                    {detailsDogs?.temperament}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Criado para:
                                </Typography>
                                <Typography>
                                    {detailsDogs?.bred_for
                                        ? detailsDogs?.bred_for
                                        : "No declarado"}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                "@media (max-width: 768px)": {
                                    flexDirection: "row",
                                    width: "100%",
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="soft">Peso</Typography>
                                <Typography>
                                    {detailsDogs?.weight?.metric} Kg
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography
                                    variant="soft"
                                    mt={1}
                                    sx={{
                                        "@media (max-width: 768px)": {
                                            mt:0
                                        },
                                    }}
                                >
                                    Altura
                                </Typography>
                                <Typography>
                                    {detailsDogs?.height?.metric} cm
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: "column",
                                display: "flex",
                                "@media (max-width: 768px)": {
                                    flexDirection: "row",
                                    width: "100%",
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    "@media (max-width: 768px)": {
                                        // width: "50%",
                                    },
                                }}
                            >
                                <Typography variant="soft">
                                    Tiempo de vida
                                </Typography>
                                <Typography>
                                    {detailsDogs?.life_span}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography
                                    variant="soft"
                                    mt={1}
                                    sx={{
                                        mt: 0,
                                    }}
                                >
                                    Grupo Racial
                                </Typography>
                                <Typography>
                                    {detailsDogs?.breed_group
                                        ? detailsDogs?.breed_group
                                        : "No Declarado"}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Container>
            )}
            {/* //* Renderizado de todas las imagenes segun la raza seleccionada  */}
            <Container sx={{ py: 1 }}>
                <Box>
                    {breedSelect ? (
                        <ImageList
                            variant="masonry"
                            gap={10}
                        >
                            {dataSearch.map((item: ItemMapSelected) => (
                                <Link
                                    href={item?.url}
                                    target="_blank"
                                    key={item.id}
                                >
                                    <ImageListItem key={item.id}>
                                        <img
                                            src={item?.url}
                                            srcSet={item?.url}
                                            loading="lazy"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRadius: "25px",
                                            }}
                                        />
                                    </ImageListItem>
                                </Link>
                            ))}
                        </ImageList>
                    ) : (
                        <Container maxWidth="sm">
                            <Box
                                component="img"
                                sx={{
                                    width: 600,
                                    height: 600,
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    "@media (max-width: 768px)": {
                                        maxWidth: "80vw",
                                        maxHeight: "40vh",
                                        mt: 7,
                                    },
                                }}
                                src={imageSearchNotFoundDogs}
                            ></Box>
                        </Container>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default ApiDogs;
