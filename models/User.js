const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const bcrypt = require('bcryptjs');   // Import bcrypt for password hashing

// Define the User schema
const userSchema = new mongoose.Schema({
  // Username must be unique and is required
  username: { type: String, unique: true, required: true },

  // Password is required; it will be hashed before saving
  password: { type: String, required: true },
});

// Mongoose pre-save middleware to hash the password before saving
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified or is new
  if (this.isModified('password')) {
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Instance method to compare plain text password with the hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // Returns a promise
};

// Export the User model
module.exports = mongoose.model('User', userSchema);
