import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core/";
import UpgradeWidget from "../components/UpgradeWidget";
const useStyles = makeStyles((theme) => ({
  outerBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  headingColor: {
    color: "#673ab7",
  },
  greenColor: {
    color: "#2e7d32",
  },
}));
const Upgrade = () => {
  const classes = useStyles();
  const handleOnclick = async (planType) => {
    const result = await fetch(
      `http://localhost:5000/subscribe/5f770e13b2952ffe5546adff/${planType}`
    );
    const data = await result.json();
    const stripe = await window.Stripe(data.checkout_public_key);
    const stripeResult = await stripe.redirectToCheckout({
      sessionId: data.checkout_session_id,
    });
    console.log(await stripeResult);
  };
  return (
    <Box className={classes.outerBox}>
      <Box>
        <Typography variant="h4">Upgrade your account</Typography>
      </Box>
      <Box display="flex" mt={5}>
        <UpgradeWidget
          heading="Premium"
          handleOnclick={() => handleOnclick("premium")}
        />
        <UpgradeWidget
          heading="Professional"
          handleOnclick={() => handleOnclick("professional")}
        />
      </Box>
    </Box>
  );
};

export default Upgrade;
