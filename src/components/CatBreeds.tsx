import * as React from "react";
import {
    Container,
    Box,
    ImageList,
    ImageListItem,
    Link,
    Rating,
    styled,
} from "@mui/material";
import { useState, useEffect } from "react";
import { imageSearchNotFoundCats } from "../config/Variables";
import { ItemMapSelected, DetailsCats } from "../interfaces/dataPets";
import {
    getCatsByBreed,
    getDetailsBreedCats,
} from "../services/getCatsByBreed";
import { Card, CardContent, Typography } from "@mui/joy";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ApiCats: React.FC<{ breedSelect: string }> = ({ breedSelect }) => {
    const [dataSearch, setDataSearch] = useState([]); // Contiene los datos filtrados por la seleccion del usuario
    const [detailsCats, setDetailsCats] = useState<DetailsCats | null>(); // Contiene los detalles de los gatos;

    useEffect(() => {
        const getData = async () => {
            if (breedSelect) {
                try {
                    const data = await getCatsByBreed(breedSelect);
                    setDataSearch(data);
                    const detailsCats = await getDetailsBreedCats(breedSelect);
                    setDetailsCats(detailsCats);
                } catch (error) {
                    console.log("Error en ApiCats");
                }
            }
        };
        getData();
        if (!breedSelect) {
            setDetailsCats(null);
        }
    }, [breedSelect]);
    
    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
            color: "#ff6d75",
        },
        "& .MuiRating-iconHover": {
            color: "#ff3d47",
        },
    });

    return (
        <>
            {detailsCats?.id && (
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
                            '@media (max-width: 768px)': {
                                flexDirection: "column"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "35rem",
                                '@media (max-width: 768px)': {
                                    width: "20rem",
                                    
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="soft">
                                    Descripción:
                                </Typography>
                                <Typography>
                                    {detailsCats?.description}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Temperamento:
                                </Typography>
                                <Typography>
                                    {detailsCats?.temperament}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                            }}
                        >
                            <CardContent>
                                <Typography variant="soft">Peso:</Typography>
                                <Typography>
                                    {detailsCats?.weight?.metric} Kg
                                </Typography>

                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Esperanza de Vida:
                                </Typography>
                                <Typography>
                                    {detailsCats?.life_span} años
                                </Typography>
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Adaptabilidad:
                                </Typography>
                                <Rating
                                    value={detailsCats?.adaptability}
                                    size="small"
                                    name="adaptability-small"
                                />
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Inteligencia:
                                </Typography>
                                <Rating
                                    value={detailsCats?.intelligence}
                                    name="intelligence-small"
                                    size="small"
                                />
                            </CardContent>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                flexWrap: "wrap",
                            }}
                        >
                            <CardContent>
                                <Typography variant="soft">
                                    Amigable con Niños:
                                </Typography>
                                <Rating
                                    value={detailsCats?.child_friendly}
                                    size="small"
                                    name="size-small"
                                />
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Amigable con Extraños:
                                </Typography>
                                <Rating
                                    value={detailsCats?.stranger_friendly}
                                    name="size-small"
                                    size="small"
                                />
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Amigable con Perros:
                                </Typography>
                                <Rating
                                    value={detailsCats?.dog_friendly}
                                    name="size-small"
                                    size="small"
                                />
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Problemas de Salud:
                                </Typography>
                                <StyledRating
                                    name="customized-color"
                                    value={detailsCats?.health_issues}
                                    icon={<FavoriteIcon fontSize="inherit" />}
                                    emptyIcon={
                                        <FavoriteBorderIcon fontSize="inherit" />
                                    }
                                />
                            </CardContent>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                alignItems: "center",
                                '@media (max-width: 768px)': {
                                    flexDirection: "row",
                                }
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Origen:{" "}
                                </Typography>
                                <Typography>{detailsCats?.origin}</Typography>
                                <Typography
                                    variant="soft"
                                    mt={1}
                                >
                                    Código País:
                                </Typography>
                                <Typography>
                                    {detailsCats?.country_code}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Container>
            )}
            <Container sx={{ py: 1 }}>
                <Box>
                    {breedSelect ? (
                        <ImageList
                            variant="masonry"
                            gap={10}
                        >
                            {dataSearch.map((item: ItemMapSelected) => (
                                <Link
                                    href={item.url}
                                    target="_blank"
                                    key={item.id}
                                >
                                    <ImageListItem key={item.id}>
                                        <img
                                            src={item?.url}
                                            srcSet={item?.url}
                                            loading="lazy"
                                            style={{ borderRadius: "25px" }}
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
                                src={imageSearchNotFoundCats}
                            ></Box>
                        </Container>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default ApiCats;
