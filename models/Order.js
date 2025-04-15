import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true,
  },
  packageId: {
    type: String,
    required: true,
  },
  packageName: {
    type: String,
    required: true,
  },  
  price: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["wallet", "instant"],
    default: "wallet",
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
