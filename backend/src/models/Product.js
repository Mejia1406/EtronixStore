import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true }, // en COP
    image: { type: String },
    stock: { type: Number, default: 0 },
    sku: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);