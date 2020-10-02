import React from "react";
import { Button } from "@material-ui/core/";
const Upgrade = () => {
  const handleOnclick = async (planType) => {
    const result = await fetch(`http://localhost:5000/subscribe/${planType}`);
    const data = await result.json();
    const stripe = await window.Stripe(data.checkout_public_key);
    const stripeResult = await stripe.redirectToCheckout({
      sessionId: data.checkout_session_id,
    });
    console.log(await stripeResult);
  };
  return (
    <div>
      <Button
        onClick={() => {
          handleOnclick("premium");
        }}
      >
        premium
      </Button>
      <Button>professional</Button>
    </div>
  );
};

export default Upgrade;
