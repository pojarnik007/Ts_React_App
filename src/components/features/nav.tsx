import "../../styles.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AttributionIcon from "@mui/icons-material/Attribution";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Navigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Главная"
          icon={<AttributionIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="Рецепты"
          icon={<ReceiptIcon />}
          component={Link}
          to="/receipts"
        />
        <BottomNavigationAction
          label="Выход"
          icon={<LogoutIcon />}
          onClick={handleLogout}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
