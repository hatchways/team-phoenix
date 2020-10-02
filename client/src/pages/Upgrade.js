import React from "react";
import { Button } from "@material-ui/core/";
import UpgradeWidget from "../component/UpgradeWidget";
const Upgrade = () => {
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
    <div>
      <UpgradeWidget heading="Premium" features={["Unlimited meetings"]} />
    </div>
  );
};

export default Upgrade;
