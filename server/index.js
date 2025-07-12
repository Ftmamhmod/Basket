import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-dusky-mu-65.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[Stripe Error]", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Start
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
