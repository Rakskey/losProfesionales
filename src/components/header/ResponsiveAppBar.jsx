import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Register from "./avatar/Register.jsx";
import Login from "./avatar/Login.jsx";

const pages = ["Servicios", "Profesionales"];
const appBarColor = "#1976d2"; // Color azul original

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = (type, userNickname) => {
    setIsLoggedIn(true);
    setUserType(type);
    setNickname(userNickname);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setNickname(null);
  };

  const handleDialogOpen = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
    handleCloseUserMenu();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogContent(null);
  };

  let settings = [];

  if (isLoggedIn) {
    if (userType === "Empleador") {
      settings = [
        {
          name: "Editar perfil",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Editar perfil</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Estado de solicitudes",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Estado de solicitudes</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Estado de servicios",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Estado de servicios</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Registro de servicios",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Registro de servicios</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Cerrar sesión",
          component: (
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                handleLogout();
              }}
            >
              <Typography textAlign="center" color={appBarColor}>Cerrar sesión</Typography>
            </MenuItem>
          ),
        },
      ];
    } else if (userType === "Profesional") {
      settings = [
        {
          name: "Editar perfil",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Editar perfil</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Servicios",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Servicios</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Historial proyectos",
          component: (
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center" color={appBarColor}>Historial proyectos</Typography>
            </MenuItem>
          ),
        },
        {
          name: "Cerrar sesión",
          component: (
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                handleLogout();
              }}
            >
              <Typography textAlign="center" color={appBarColor}>Cerrar sesión</Typography>
            </MenuItem>
          ),
        },
      ];
    }
  } else {
    settings = [
      {
        name: "Registrarse",
        component: (
          <MenuItem onClick={() => handleDialogOpen(<Register />)}>
            <Typography textAlign="center" color={appBarColor}>Registrarse</Typography>
          </MenuItem>
        ),
      },
      {
        name: "Iniciar sesión",
        component: (
          <MenuItem
            onClick={() => handleDialogOpen(<Login onLogin={handleLogin} />)}
          >
            <Typography textAlign="center" color={appBarColor}>Iniciar sesión</Typography>
          </MenuItem>
        ),
      },
    ];
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "transparent", color: appBarColor, boxShadow: 'none' }}> {/* Fondo transparente, texto azul, sin sombra */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: appBarColor }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: appBarColor,
              textDecoration: "none",
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            PROFESIONALES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color={appBarColor}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: appBarColor }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: appBarColor,
              textDecoration: "none",
              fontSize: { xs: "1.2rem", md: "2rem" },
            }}
          >
            PROFESIONALES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: appBarColor, display: "block", fontSize: { xs: "0.8rem", md: "1rem" } }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, textAlign: "center" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={nickname || "Remy Sharp"} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {isLoggedIn && (
              <Typography variant="body2" sx={{ fontSize: { xs: "0.8rem", md: "1rem" }, color: appBarColor }}>
                {nickname}
              </Typography>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  {setting.component}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default ResponsiveAppBar;