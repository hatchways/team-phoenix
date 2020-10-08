import React, { Fragment, useContext, useEffect } from "react";
import { Box, Typography, makeStyles, Paper, Button } from "@material-ui/core/";
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
  paper: {
    width: "50%",
    height: "50%",
  },
  unsubscribe: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
      console.log("SSS");
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
  const handleUnsubscribe = async () => {
    const result = await fetch(
      `http://localhost:5000//cancel-subscription/${user.subscription_id}/${user._id}`
    );
    const data = await result.json();
    if ((await data.result) === "canceled") {
      alert("Unsubscribed successfully");
    }
  };
  return (
    <Fragment>
      {!user.subscription_id ? (
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
      ) : (
        <Box mt={4} className={classes.unsubscribe}>
          <Paper className={classes.paper}>
            <Box mt={4}>
              <Typography variant="h5" color="secondary" align="center">
                You already subscribed calend membership
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleUnsubscribe}
              >
                Cancel Unsubscribe
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Fragment>
  );
};

export default Upgrade;
