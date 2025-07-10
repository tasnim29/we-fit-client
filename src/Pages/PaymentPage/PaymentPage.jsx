import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import CheckoutForm from "./CheckoutForm"; // I'll create this next

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchParams] = useSearchParams();
  const trainerId = searchParams.get("trainer");
  const packageName = searchParams.get("package");
  const slotName = searchParams.get("slot");

  // Fetch trainer slot info
  const { data: slots = [] } = useQuery({
    queryKey: ["trainerSlots", trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/slots/trainer/${trainerId}`);
      return res.data;
    },
  });

  const slot = slots.find((s) => s.slotName === slotName);

  const pkg = {
    Basic: 10,
    Standard: 50,
    Premium: 100,
  }[packageName];

  if (!slot) return <p className="text-red-500">Invalid slot</p>;

  return (
    <div className="max-w-2xl mx-auto py-32 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>

      <div className="bg-white p-6 shadow rounded-lg mb-6 space-y-2">
        <p>
          <strong>Trainer:</strong> {slot.trainerName}
        </p>
        <p>
          <strong>Slot:</strong> {slot.slotName} - {slot.slotTime}
        </p>
        <p>
          <strong>Class:</strong> {slot.className}
        </p>
        <p>
          <strong>Package:</strong> {packageName}
        </p>
        <p>
          <strong>Price:</strong> ${pkg}
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          trainerId={trainerId}
          slot={slot}
          price={pkg}
          packageName={packageName}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
