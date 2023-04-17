import * as React from "react";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { actionDeleteTodo, actionUpdateTodo } from "../../action/actionTodo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Box, Checkbox, Grid, Radio, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
const theme = createTheme();
function DetailTodo(props) {
  const { id, description, complete, title } = props?.dataDetail;
  const [openDetail, setOpenDetail] = React.useState(false);
  const [selectedValue, setSelectedValue] = useState("a");

  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    title: yup.string().required("Required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const handleDelete = () => {
    props.handleClose();
    dispatch(actionDeleteTodo(props?.dataDetail));
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const onSubmit = (data) => {
    const complete = selectedValue !== "a";
    const newData = {
      complete: complete,
      description: data.name,
      title: data.title,
    };
    props.handleClose();
    dispatch(actionUpdateTodo(newData, id));
  };

  const handleUpdate = () => {
    setOpenDetail(true);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCheckBox = () => {
    const newCheck = {
      ...props?.dataDetail,
      complete: !props?.dataDetail.complete,
    };
    props.handleClose();
    toast.success("update todo successfully");
    dispatch(actionUpdateTodo(newCheck, props?.dataDetail.id));
  };

  return (
    <Box>
      <ToastContainer />
      <Box sx={{ width: "500px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Checkbox onChange={handleCheckBox} checked={complete} />
            </ListItemAvatar>
            <ListItemText
              sx={
                complete
                  ? {
                      color: "#b4b4b4",
                      textDecoration: "line-through",
                    }
                  : { color: "#454545" }
              }
              primary={title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={
                      complete
                        ? {
                            color: "#b4b4b4",
                            textDecoration: "line-through",
                          }
                        : { color: "#454545" }
                    }
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {description}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Box sx={{ display: "flex" }}>
            <Box onClick={() => handleDelete()} sx={{ cursor: "pointer" }}>
              <DeleteRoundedIcon />
            </Box>
            <Box
              sx={{
                marginLeft: "20px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={() => handleUpdate()}
            >
              <SettingsIcon />
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={openDetail}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box>
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
        </Box>
      </Dialog>
    </Box>
  );
}

export default DetailTodo;
