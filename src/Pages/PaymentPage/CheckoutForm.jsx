import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { use, useState } from "react";
import Swal from "sweetalert2";

import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const CheckoutForm = ({ trainerId, slot, price, packageName }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    // 1. Create Payment Intent from backend
    const res = await axiosSecure.post("/create-payment-intent", { price });
    const clientSecret = res.data.clientSecret;

    // 2. Confirm payment
    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      Swal.fire("Error", error.message, "error");
      setProcessing(false);
      return;
    } else {
      console.log("[paymentMethod]", paymentMethod);
    }

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
      receipt_email: user.email,
    });

    if (paymentIntent.status === "succeeded") {
      // 3. Save payment info to DB
      await axiosSecure.post("/payments", {
        trainerId,
        trainerName: slot.trainerName,
        slotName: slot.slotName,
        className: slot.className,
        packageName,
        amount: price,
        userEmail: user.email,
        userName: user.displayName,
        date: new Date(),
        transactionId: paymentIntent.id,
      });

      // 4. Increase booking count of this class
      await axiosSecure.patch(`/classes/increment-booking/${slot.className}`);

      Swal.fire("Success", "Payment completed successfully", "success");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="p-4 border rounded-md" />
      <button
        type="submit"
        disabled={!stripe || !elements || processing}
        className="btn bg-primary text-white px-6 py-2 rounded-full hover:bg-black"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
