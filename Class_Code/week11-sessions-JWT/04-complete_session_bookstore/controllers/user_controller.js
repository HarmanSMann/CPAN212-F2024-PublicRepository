const User = require('../models/user');

// Register user
const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Store user info in session
    req.session.user = {
      userId: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };

    res.status(200).json({
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Logout user
const logoutUser = (req, res) => {
  // Destroy the session on logout
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

// Check session (get user data from session)
const checkSession = (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      userId: req.session.user.userId,
      first_name: req.session.user.first_name,
    });
  } else {
    res.status(401).json({ message: 'No user session found' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkSession,
};
