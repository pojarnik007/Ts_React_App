import { useForm } from "react-hook-form";
import { useLoginMutation } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [loginRequest, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await loginRequest(data).unwrap();
      dispatch(login(user.accessToken));
      navigate("/", { replace: true })
    } catch {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#eef2f3"
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 380,
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
        }}
      >
        <Typography variant="h4" align="center" fontWeight={600} mb={3}>
          Вход
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Имя пользователя"
            margin="normal"
            {...register("username")}
          />

          <TextField
            fullWidth
            type="password"
            label="Пароль"
            margin="normal"
            {...register("password")}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{ mt: 3, py: 1.2, fontSize: 16 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Войти"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
