import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        unit_price: Number,
        quantity: Number,
      },
    ],
    buyer: {
      name: String,
      email: String,
    },
    total: Number,
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    external_reference: String, // para enlazar con Mercado Pago
    mp_preference_id: String,
    mp_payment_id: String,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
