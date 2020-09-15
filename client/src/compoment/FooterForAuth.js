import React from "react";
import { Paper, Box, Typography, Link } from "@material-ui/core";
const FooterForAuth = () => {
  return (
    <Box mt={6}>
      <Typography align="center" variant="body1" gutterBottom>
        Already have an account? <Link color="primary">Log in</Link>
      </Typography>
    </Box>
  );
};

export default FooterForAuth;
