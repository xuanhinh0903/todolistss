import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { actionLogin } from "../../reducer/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../loading";
import { toast, ToastContainer } from "react-toastify";

const theme = createTheme();

const schema = yup.object().shape({
  username: yup.string().required("Required").email("Username invalid"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must not exceed 8 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, requesting, message } = useSelector(
    (state) => state?.loginReducer
  );

  const onSubmit = () => {
    dispatch(actionLogin(watch()));
  };

  const userToken = localStorage.getItem("token");
  React.useEffect(() => {
    if (userToken) {
      toast.success("login success");
      navigate("/");
    }
    if (message?.response?.status === 400) {
      dispatch({
        type: "CLEAR_LOGIN_SUCCESS",
      });
      toast.error("accout errors");
    }
  }, [userToken, message]);

  return (
    <div>
      <ToastContainer />
      {requesting && !message ? (
        <CircularIndeterminate />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ThemeProvider theme={theme}>
            <Grid
              container
              component="main"
              sx={{ height: "100vh", justifyContent: "center" }}
            >
              <CssBaseline />
              <Grid item xs={false} sm={1} md={9} />
              <Grid>
                <Box
                  sx={{
                    my: 8,
                    mx: 50,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="username"
                      label="username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      {...register("username")}
                    />
                    {errors.username && (
                      <Typography sx={{ marginLeft: "15px", color: "red" }}>
                        {errors.username.message}
                      </Typography>
                    )}
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      {...register("password")}
                      autoComplete="current-password"
                    />
                    {errors.password && (
                      <Typography sx={{ marginLeft: "15px", color: "red" }}>
                        {errors.password.message}
                      </Typography>
                    )}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link href="/register" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        </form>
      )}
    </div>
  );
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/login">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Login;
