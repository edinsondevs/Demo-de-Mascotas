import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PetsIcon from "@mui/icons-material/Pets";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/List";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { isLoggedUser } from "../store/slices/sesions/userLoginStore";
import { InterfaceNavbarPage, LoggedUser } from "../interfaces/interfaceNavbar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// import Demo from "./Menu";


const NavigationBar: React.FC<object> = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDisconnected = () => dispatch(isLoggedUser(false));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    const loggedUser: LoggedUser = useSelector(
        (state: RootState) => state.loggedUser.dataUserLogged
    );

    const pages: InterfaceNavbarPage[] = [
        {
            title: "Inicio",
            path: "index",
            icon: <HomeOutlinedIcon />,
        },
        {
            title: "Adoptados",
            path: "pets/adoptedpets",
            icon: <ListIcon />,
        },
        {
            title: "Informacion",
            // path: "pets/adoptedpets",
            // icon: <ListIcon />,
            icon: <InfoOutlinedIcon />,
        },
        {
            title: loggedUser.success ? "Salir" : "Ingresar",
            onClick: loggedUser.success ? isDisconnected : undefined,
            path: "login",
            icon: loggedUser ? <LogoutIcon /> : <LoginIcon />,
        },
    ];
    const subpages: InterfaceNavbarPage[] = [
        {
            title: "Gatos",
            path: "pets/cats",
            icon: <PetsIcon />,
        },
        {
            title: "Perros",
            path: "pets/dogs",
            icon: <PetsIcon />,
        },
    ];

    const viewdata = (path: string) => {
        navigate(`${path}`);
        handleClose()
    }
    
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
            >
                <Toolbar
                    disableGutters
                    sx={{
                        // mx: 10,
                        "@media (max-width: 768px)": {
                            mx: 2,
                        },
                        "@media (max-width: 1440px)": {
                            mx: 0,
                        },
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpenDrawer(true)}
                        sx={{ display: { md: "none" }, pl: 3 }}
                    >
                        <MenuIcon sx={{ fontSize: "32px" }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            pr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            width: "120em",
                            justifyContent: "center",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Adopción Virtual
                    </Typography>
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            mx: {
                                xs: 0,
                                sm: 2,
                                md: 2,
                                lg: 8,
                            },
                            gap: 20,
                            color: "white",
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={pages[0].icon}
                            sx={{
                                color: "white",
                                border: "1px solid #2196F3",
                            }}
                            aria-haspopup="true"
                            component={NavLink}
                            to={`/${pages[0].path}`}
                        >
                            {pages[0].title}
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={pages[1].icon}
                            sx={{
                                color: "white",
                                border: "1px solid #2196F3",
                            }}
                            aria-haspopup="true"
                            component={NavLink}
                            to={`/${pages[1].path}`}
                        >
                            {pages[1].title}
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={pages[2].icon}
                            sx={{
                                color: "white",
                                border: "1px solid #2196F3",
                            }}
                            onClick={handleClick}
                        >
                            {pages[2].title}
                        </Button>
                        {/* //******************************   */}

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {subpages.map((page, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => viewdata(page.path ?? "")}
                                >
                                    {page.title}
                                </MenuItem>
                            ))}
                        </Menu>
                        {/* //******************************   */}
                        <Button
                            variant="outlined"
                            startIcon={pages[3].icon}
                            sx={{
                                color: "white",
                                border: "1px solid #2196F3",
                            }}
                            component={NavLink}
                            to={`/${pages[3].path}`}
                            aria-haspopup="true"
                        >
                            {pages[3].title}
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            width: "100%",
                            alignItems: "center",
                            "@media (max-width: 768px)": {
                                display: "flex",
                                justifyContent: "flex-end",
                            },
                            "@media (max-width: 1440px)": {
                                display: "flex",
                                justifyContent: "flex-end",
                            },
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                ml: 4,
                                mr: 2,
                                "@media (max-width: 768px)": {
                                    mr: 3,
                                },
                            }}
                        >
                            {loggedUser?.userLogged[0]?.name?.first +
                                " " +
                                loggedUser?.userLogged[0]?.name?.last}
                        </Typography>
                        <Avatar
                            alt={
                                loggedUser?.userLogged[0]?.name?.first +
                                " " +
                                loggedUser?.userLogged[0]?.name?.last
                            }
                            src={loggedUser?.userLogged[0]?.picture?.medium}
                            sx={{
                                width: 55,
                                height: 55,
                                "@media (max-width: 768px)": {
                                    width: 45,
                                    height: 45,
                                    mr: 4,
                                },
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <Box sx={{ width: 250 }}>
                    <Button
                        startIcon={pages[0].icon}
                        sx={{
                            my: 2,
                            mx: 4,
                            display: "flex",
                            width: "12em",
                            justifyContent: "flex-start",
                        }}
                        aria-haspopup="true"
                        component={NavLink}
                        to={`/${pages[0].path}`}
                        onClick={() => setOpenDrawer(false)}
                    >
                        {pages[0].title}
                    </Button>
                    <Button
                        startIcon={pages[1].icon}
                        sx={{
                            my: 2,
                            mx: 4,
                            display: "flex",
                            width: "12em",
                            justifyContent: "flex-start",
                        }}
                        aria-haspopup="true"
                        component={NavLink}
                        to={`/${pages[1].path}`}
                        onClick={() => setOpenDrawer(false)}
                    >
                        {pages[1].title}
                    </Button>
                    <Button
                        startIcon={pages[2].icon}
                        sx={{
                            my: 2,
                            mx: 4,
                            display: "flex",
                            width: "12em",
                            justifyContent: "flex-start",
                        }}
                        onClick={handleClick}
                    >
                        {pages[2].title}
                    </Button>
                    {/* //******************************   */}

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClick={() => setOpenDrawer(false)}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        {subpages.map((page, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => viewdata(page.path ?? "")}
                                sx={{
                                    my: 2,
                                    mx: 4,
                                    display: "flex",
                                    width: "12em",
                                    justifyContent: "flex-start",
                                    color: "#2196F3",
                                }}
                            >
                                {page.title}
                            </MenuItem>
                        ))}
                    </Menu>
                    {/* //******************************   */}
                    <Button
                        startIcon={pages[3].icon}
                        onClick={() => setOpenDrawer(false)}
                        sx={{
                            my: 2,
                            mx: 4,
                            display: "flex",
                            width: "12em",
                            justifyContent: "flex-start",
                            color: "red",
                        }}
                        component={NavLink}
                        to={`/${pages[3].path}`}
                        aria-haspopup="true"
                    >
                        {pages[3].title}
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
};

export default NavigationBar;
