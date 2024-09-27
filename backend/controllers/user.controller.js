import User from "../models/usermodel.js"

export const registerUser = async (req, res) => {
    console.log("hi there");
  try {
    const { name, gender, year, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name,
      gender,
      year,
      email,
      password,
    });
    console.log(newUser);
    

    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
