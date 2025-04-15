import mongoose from "mongoose"

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a package name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  formattedPrice: {
    type: String,
  },
})

// Pre-save hook to format price
PackageSchema.pre("save", function (next) {
  this.formattedPrice = `Tk ${this.price}`
  next()
})

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide a product ID"],
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    enum: ["free-fire", "pubg", "subscription", "other"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=150&width=200",
  },
  packages: [PackageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)
