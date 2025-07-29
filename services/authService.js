const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async ({ username, email, password, role, profile, company }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: 409,
        error: "Email already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      username,
      email,
      password: hashedPassword,
      role,
    };
    if (role === "job_seeker" && profile) {
      userData.profile = profile;
    } else if (role === "employer" && company) {
      userData.company = company;
    }

    const newUser = new User(userData);
    await newUser.save();

    return {
      status: 201,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile || null,
        company: newUser.company || null,
      },
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      status: 500,
      error: "Internal Server Error",
    };
  }
};

exports.loginUser = async ({ email, password, role } = {}) => {
  if (!email || !password) {
    console.error("Email or password missing");
    return { error: "Email or password is required" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.error("User not found");
    return { error: "Invalid credentials" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    console.error("Incorrect password");
    return { error: "Invalid credentials" };
  }

  if (user.role !== role) {
    console.error("Role mismatch");
    return { error: "Unauthorized role" };
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  const { _id, username, email: userEmail } = user;

  return {
    token,
    user: { _id, username, email: userEmail, role: user.role }
  };
};


