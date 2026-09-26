import mongoose from 'mongoose';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { initialProducts } from '../seed/seedData.js';

let mongoMemoryServer = null;

const autoSeed = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[AutoSeed] Database is empty. Creating default admin & student accounts...');
      await User.create({
        name: 'CampusCart Admin',
        email: 'admin@campuscart.com',
        password: 'Admin@123',
        phone: '9876543210',
        address: {
          street: 'Admin Block, North Campus',
          city: 'University City',
          state: 'Delhi',
          pincode: '110007'
        },
        role: 'admin'
      });

      await User.create({
        name: 'Alex Student',
        email: 'student@campuscart.com',
        password: 'Student@123',
        phone: '9123456789',
        address: {
          street: 'Hostel 4, Room 204',
          city: 'University City',
          state: 'Delhi',
          pincode: '110007'
        },
        role: 'user'
      });
      console.log('[AutoSeed] Admin & Student accounts created successfully!');
    }

    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('[AutoSeed] Seeding product catalog...');
      await Product.insertMany(initialProducts);
      console.log(`[AutoSeed] Inserted ${initialProducts.length} initial products!`);
    }
  } catch (err) {
    console.error(`[AutoSeed Error]: ${err.message}`);
  }
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campuscart';
    mongoose.set('strictQuery', false);

    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 2500
      });
      console.log(`[MongoDB] Connected to database: ${conn.connection.host}`);
    } catch (err) {
      console.log('[MongoDB] Local MongoDB connection failed or not running. Starting in-memory MongoDB server...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[MongoDB Memory] Connected to in-memory database at: ${memoryUri}`);
    }

    // Run automatic seeding if database is fresh
    await autoSeed();
  } catch (error) {
    console.error(`[MongoDB Error]: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
