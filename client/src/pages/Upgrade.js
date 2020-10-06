import React, { useContext, useEffect } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core/";
import UpgradeWidget from "../components/UpgradeWidget";
import Context from "../contexts/CalendStore";
import { getOnlyUserId } from "../utilities/SaveTokens";
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
  const { userId, setUserId, user, setUser } = useContext(Context);
  if (!userId) {
    setUserId(getOnlyUserId());
  }
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch(`http://127.0.0.1:5000/fetch-user/${userId}`);
      let response = await data.json();
      if (response.result) {
        setUser(response.result);
      }
    };
    if (!user && userId) {
      fetchUser();
    }
  });
  const handleOnclick = async (planType) => {
    const result = await fetch(
      `http://localhost:5000/subscribe/${userId}/${planType}`
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
