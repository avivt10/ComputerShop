const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String },
    description:{ type:String },
    price: { type: String},
    currency : {type : String},
    category: { type: String },
    image: { type: String },
    stock: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
