import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function DesktopNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="fixed" sx = {{ top: "0", zIndex: 1100 }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/receipts">
            Рецепты
          </Button>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Выход
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default DesktopNavigation;