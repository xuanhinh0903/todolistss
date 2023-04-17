import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Grid, Radio, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { actionUpdateTodo } from "../../action/actionTodo";
const theme = createTheme();
const UpdateData = (props) => {
  const { description, title, id } = props?.dataDetail;
  const [selectedValue, setSelectedValue] = useState("a");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    title: yup.string().required("Required"),
  });
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data, e) => {
    const complete = selectedValue !== "a";
    const newData = {
      complete: complete,
      description: data.name,
      title: data.title,
    };
    props.handleClose();
    dispatch(actionUpdateTodo(newData, id));
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <Grid sx={{ width: "95%", margin: "0 auto", padding: "20px" }}>
            <CssBaseline />
            <Grid />
            <Grid>
              <Box>
                <Typography
                  sx={{ textAlign: "center" }}
                  component="h1"
                  variant="h5"
                >
                  Update todo for you
                </Typography>
                <Box>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="title"
                    label="title"
                    type="title"
                    id="title"
                    defaultValue={title}
                    {...register("title")}
                  />
                  {errors.title && (
                    <Typography sx={{ marginLeft: "15px", color: "red" }}>
                      {errors.title.message}
                    </Typography>
                  )}
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    defaultValue={description}
                    {...register("name")}
                  />
                  {errors.name && (
                    <Typography sx={{ marginLeft: "15px", color: "red" }}>
                      {errors.name.message}
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>Not Complete</Typography>
                    <Radio
                      checked={selectedValue === "a"}
                      onChange={handleChange}
                      value="a"
                      name="radio-buttons"
                    />
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>Complete</Typography>
                    <Radio
                      // checked={selectedValue === "b"}
                      checked={selectedValue === "b"}
                      onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                    />
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>
    </div>
  );
};
export default UpdateData;
