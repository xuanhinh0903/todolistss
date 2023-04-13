import { Box, Typography } from "@mui/material";

function Page404() {
  return (
    <Box sx={{ margin: "0", padding: "0" }}>
      <Typography
        sx={{
          fontSize: "50px",
          textAlign: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems:"center",
        }}
      >
        Page Not Found
      </Typography>
    </Box>
  );
}

export default Page404;
