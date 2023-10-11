import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/joy";

export default function NotFoundPage() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage:
                    'url("https://img.freepik.com/fotos-premium/lindo-bulldog-frances-usa-pajarita-gafas-aisladas-sobre-fondo-blanco-mascotas-concepto-animal_34435-4827.jpg?w=2000")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                "@media (max-width: 768px)": {
                    height: "90vh",
                    backgroundSize: "100%",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 100,
                    "@media (max-width: 768px)": {
                        ml: 0,
                        marginLeft: 20,
                        marginTop: 40,
                    },
                }}
            >
                <Typography
                    level="display1"
                    textAlign="center"
                    sx={{
                        "@media (max-width: 768px)": {
                            fontSize: "2rem",
                        },
                    }}
                >
                    404 NOT FOUNT PAGE
                </Typography>
                <Button
                    component={Link}
                    to="/index"
                    variant="contained"
                    color="primary"
                >
                    Ir al Inicio
                </Button>
            </Box>

        </Container>
    );
}
