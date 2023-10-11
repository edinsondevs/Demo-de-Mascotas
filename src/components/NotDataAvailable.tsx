import { CardMedia, Typography, Stack } from "@mui/material";

export function NotDataAvailable () {
    return (
        <Stack
            sx={{
                width: "100%",
                height: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    pt: 6,
                    "@media (max-width: 768px)": {
                        fontSize: "24px",
                        fontWeight: "bold",
                    },
                }}
            >
                Sin datos para mostrar
            </Typography>
            <CardMedia
                title="Sin resultados"
                sx={{
                    width: "80%",
                    height: "100%",
                    objectFit: "cover",
                    "@media (max-width: 768px)": {
                        width: 400,
                        height: 300,
                        objectFit: "none",
                    },
                }}
                image="https://dgcreative.neocities.org/ImagenesInicio/Fotografia_didactico/mascotas.jpg"
            />
        </Stack>
    );
}