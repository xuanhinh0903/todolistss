import * as React from "react";
import Avatar from "@mui/material/Avatar";
import * as yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { actionRegister } from "../../reducer/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularIndeterminate from "../loading";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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

const schema = yup.object().shape({
  email: yup.string().required("Required").email("email invalid"),
  username: yup.string().required("Required").email("Username invalid"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must not exceed 8 characters"),
});

const theme = createTheme();
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { status, requesting, message } = useSelector((state) => {
    return state?.registerSlice;
  });

  const onSubmit = (data) => {
    dispatch(actionRegister(data));
    // toast.success("trans.toastMessages.createSuccesssAdminAccount");
  };

  React.useEffect(() => {
    console.log(status);
    if (status === 200) {
      // alert("create success");
      toast.success("registered successfully");
      navigate("/login");
    }
    if (message) {
      alert("xin vui lòng thử lại");
    }
  }, [status, requesting, message]);
  return (
    <div>
      {requesting && !message ? (
        <CircularIndeterminate />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ThemeProvider theme={theme}>
            <Grid
              container
              component="main"
              sx={{
                height: "100vh",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <CssBaseline />
              <Grid />
              <Grid>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "800px",
                    margin: "150px auto",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Register
                  </Typography>

                  <Box sx={{ width: "100%" }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      {...register("email")}
                    />
                    {errors.email && (
                      <Typography sx={{ marginLeft: "15px", color: "red" }}>
                        {errors.email.message}
                      </Typography>
                    )}
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
                      Register
                    </Button>
                    <Grid container>
                      <Grid item>
                        <Link href="/login" variant="body2">
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

export default Register;
