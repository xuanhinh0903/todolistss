import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UpdateData from "../updateData";
import CircularIndeterminate from "../loading";
import DetailTodo from "../detailTodo";
import { ToastContainer } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Box, Checkbox } from "@mui/material";
import {
  actionDeleteTodo,
  actionGetTodo,
  actionUpdateTodo,
} from "../../action/actionTodo";

const GetData = (props) => {
  // const { requesting, list, message } = props?.data;
  const DATA = useSelector((state) => state?.todolistReducer);
  const { requesting, list, message } = DATA;
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [dataDetail, setDataDetail] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
    setOpenDetail(false);
  };

  const handleDelete = (e) => {
    dispatch(actionDeleteTodo(e));
  };

  const handleUpdate = (e) => {
    setOpen(true);
    setDataDetail(e);
  };

  const handleDouble = (e) => {
    setOpenDetail(true);
    setDataDetail(e);
  };

  const handleCheckBox = (e) => {
    const newCheck = {
      ...e,
      complete: !e.complete,
    };
    dispatch(actionUpdateTodo(newCheck, e.id));
  };

  useEffect(() => {
    dispatch(actionGetTodo());
  }, []);

  return (
    <div>
      <ToastContainer />
      {list.length === 0 ? (
        <Typography
          sx={{
            color: "#d4d4d4",
            marginTop: "40%",
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          No todo exist
        </Typography>
      ) : (
        <div>
          {requesting && !message ? (
            <CircularIndeterminate />
          ) : (
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                marginTop: "100px",
              }}
            >
              {list.map((item, index) => (
                <Box key={index} onDoubleClick={() => handleDouble(item)}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Checkbox
                          onChange={() => handleCheckBox(item)}
                          checked={item.complete}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={
                          item.complete
                            ? {
                                color: "#b4b4b4",
                                textDecoration: "line-through",
                              }
                            : { color: "#454545" }
                        }
                        primary={item.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={
                                item.complete
                                  ? {
                                      color: "#b4b4b4",
                                      textDecoration: "line-through",
                                    }
                                  : { color: "#454545" }
                              }
                              component="span"
                              variant="body2"
                            >
                              {item.description}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Box sx={{ display: "flex" }}>
                      <Box
                        onClick={() => handleDelete(item)}
                        sx={{ cursor: "pointer" }}
                      >
                        <DeleteRoundedIcon />
                      </Box>
                      <Box
                        onClick={() => handleUpdate(item)}
                        sx={{ marginLeft: "20px", cursor: "pointer" }}
                      >
                        <SettingsIcon />
                      </Box>
                    </Box>
                  </Box>
                  <Divider variant="inset" component="li" />
                </Box>
              ))}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <UpdateData dataDetail={dataDetail} handleClose={handleClose} />
              </Dialog>

              <Dialog
                open={openDetail}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DetailTodo dataDetail={dataDetail} handleClose={handleClose} />
              </Dialog>
            </List>
          )}
        </div>
      )}
    </div>
  );
};

export default GetData;
