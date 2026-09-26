import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please add a product description']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be positive']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Stationery',
        'Bags & College Essentials',
        'Tech & Accessories',
        'Campus Wear',
        'Hostel & Lifestyle'
      ]
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL']
    },
    stock: {
      type: Number,
      required: [true, 'Please specify stock quantity'],
      default: 0,
      min: [0, 'Stock cannot be negative']
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [0, 'Rating minimum is 0'],
      max: [5, 'Rating maximum is 5']
    },
    reviewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
