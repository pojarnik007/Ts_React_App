import { Link, Route, Routes } from "react-router-dom";
import "../../styles.css"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttributionIcon from '@mui/icons-material/Attribution';

function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Main" icon={<AttributionIcon/>} component={Link} to="/"/>
          <BottomNavigationAction label="Receipts" icon={<ReceiptIcon/>} component={Link} to="/receipts"/>
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;