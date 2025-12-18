import Donor from "../models/donor.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerDonor = async (req, res) => {
  try {
    const { name, email, bloodGroup, password } = req.body;

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: "Donor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = await Donor.create({
      name,
      email,
      bloodGroup,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Donor registered successfully",
      donor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: donor._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      donor
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
