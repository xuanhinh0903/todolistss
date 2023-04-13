import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Grid, Radio, TextField, Typography } from "@mui/material";
import CircularIndeterminate from "../loading";
import { actionAddTodo } from "../../action/actionTodo";
const theme = createTheme();
const AddData = () => {
  const [selectedValue, setSelectedValue] = useState("a");
  const ADDTOTO = useSelector((state) => {
    return state?.todolistReducer;
  });
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
    dispatch(actionAddTodo(newData));
    toast.success("Create todo sucessfully!!");
    reset();
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <ToastContainer />
      {ADDTOTO?.requesting ? (
        <CircularIndeterminate />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ThemeProvider theme={theme}>
            <Grid sx={{ marginTop: "100px" }}>
              <CssBaseline />
              <Grid />
              <Grid>
                <Box>
                  <Typography
                    sx={{ textAlign: "center" }}
                    component="h1"
                    variant="h5"
                  >
                    Add todo for you
                  </Typography>
                  <Box>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      {...register("name")}
                    />
                    {errors.name && (
                      <Typography sx={{ marginLeft: "15px", color: "red" }}>
                        {errors.name.message}
                      </Typography>
                    )}
                    <TextField
                      margin="normal"
                      fullWidth
                      name="title"
                      label="title"
                      type="title"
                      id="title"
                      {...register("title")}
                    />
                    {errors.title && (
                      <Typography sx={{ marginLeft: "15px", color: "red" }}>
                        {errors.title.message}
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
                      Add Todo
                    </Button>
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
export default AddData;
