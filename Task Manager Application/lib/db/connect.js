import mongoose from 'mongoose';

// Use environment variables to securely store the MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI;

// Initialize a cache for the database connection
let cached = global.mongoose;

// Create a cached object if it does not exist
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database.
 * It utilizes a cache to reuse existing connections for efficiency.
 * If a connection already exists, it returns the cached connection.
 * If not, it establishes a new connection and caches it for future use.
 *
 * @returns {Promise<mongoose.Connection>} The Mongoose connection instance.
 */
async function dbConnect() {
    // Return the cached connection if it exists
    if (cached.conn) {
        console.log('Using cached database connection');
        return cached.conn; 
    }

    // Create a new connection promise if one doesn't already exist
    if (!cached.promise) {
        console.log('Creating a new database connection');
        const opts = {
            bufferCommands: false,
        };

        // Establish a new connection to the database
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('Database connection established');
            return mongoose;
        }).catch((error) => {
            console.error('Error connecting to the database:', error);
            throw error;
        });
    }

    // Await the connection promise and cache the connection
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
