/*
fieldName1: {
    type: String, // Example: 'Post Title'
    required: true, // Indicates this field is mandatory
    trim: true // Removes whitespace from both ends
  },


  
  fieldName2: {
    type: Number, // Example: 42 (could be an age, count, etc.)
    required: false // Optional field
  },
  fieldName3: {
    type: Boolean, // Example: true (could indicate status, published or not)
    default: false // Default value if not provided
  },
  fieldName4: {
    type: Date, // Example: new Date('2023-01-01')
    default: Date.now // Sets current date as default
  },
  fieldName5: [{
    type: String, // Example: ['tag1', 'tag2', 'tag3']
    trim: true // Clean up whitespace
  }],
  fieldName6: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to another collection (e.g., User)
      required: true // Mandatory field
    },
    comment: {
      type: String, // Example: 'Great post!'
      required: true // Mandatory field
    },
    createdAt: {
      type: Date,
      default: Date.now // Automatically set to the current date
    }
  }]
*/

const mongoose = require('mongoose');

// Define the schema
const templateSchema = new mongoose.Schema({
  
});

// Create the model
const Template = mongoose.model('Template', templateSchema);

module.exports = Template;
