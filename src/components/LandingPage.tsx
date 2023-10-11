import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

import { NavLink } from "react-router-dom";
import { imageAdoptions, imageRegister } from "../config/Variables";

const LandingPage = () => {
    return (
        <div>
            <Grid
                container
                direction="row"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: "10%",
                }}
            >
                <Grid
                    item
                    xs={12}
                    // sm={6}
                    md={6}
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "300px",
                    }}
                >
                    <Box
                        component={NavLink}
                        to={`/addpetform`}
                        sx={{ textDecoration: "none", bgColor: "primary" }}
                    >
                        <Card
                            sx={{
                                mx: "20px",
                                textAlign: "center",
                                borderRadius: "25px",
                                boxShadow: 9,
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                width: 400,
                                height: 400,
                                "@media (max-width: 768px)": {
                                    width: 300,
                                    height: 250,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                src={imageRegister}
                                alt=""
                                sx={{
                                    width: 350,
                                    height: 350,
                                    "@media (max-width: 768px)": {
                                        width: 200,
                                        height: 200,
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{ position: "center" }}
                            >
                                Registra a tu Mascota
                            </Typography>
                        </Card>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "300px",
                    }}
                >
                    <Box
                        component={NavLink}
                        to={`/availablepetslist`}
                        sx={{
                            textDecoration: "none",
                        }}
                    >
                        <Card
                            sx={{
                                mx: "20px",
                                textAlign: "center",
                                borderRadius: "25px",
                                boxShadow: 9,
                                width: 400,
                                height: 400,
                                "@media (max-width: 768px)": {
                                    width: 300,
                                    height: 250,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                src={imageAdoptions}
                                alt="Adopcion de mascotas"
                                sx={{
                                    width: 450,
                                    height: 350,
                                    "@media (max-width: 768px)": {
                                        width: 300,
                                        height: 200,
                                    },
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{ position: "center" }}
                            >
                                Adopta una Mascota
                            </Typography>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default LandingPage;
