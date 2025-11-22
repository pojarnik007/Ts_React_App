import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f3f6f9"
      }}>
      <Paper
        sx={{
          p: 5,
          width: 500,
          textAlign: "center",
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
        }}>
        <Typography variant="h3" fontWeight={600} mb={2}>
          Добро пожаловать!
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Вы успешно вошли в аккаунт 🎉
        </Typography>
      </Paper>
    </Box>
  );
};

export default MainPage;
