import express from "express";
import { User } from "../models/userModel.js";
// import { upload } from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

// Fetch users
router.get("/getuser", async (req, res) => {
  const user = await User.find();

  res.send(user);
});

// Create a new user
router.post("/createuser", async (req, res) => {
  const { name, avatar, age, phone, email, address } = req.body;

  if (!name || !age || !phone || !email || !address) {
    return res.status(422).json({ error: "One or more fields are empty!" });
  }

  const isEmail = await User.findOne({ email: email });
  const isPhone = await User.findOne({ phone: phone });

  if (isEmail) {
    return res.status(422).json({ error: "Email-Id already exists!" });
  } else if (isPhone) {
    return res.status(422).json({ error: "Phone number already exists!" });
  } else {
    const newUser = new User({ name, avatar, age, phone, email, address });
    await newUser.save();

    res.status(200).json({ message: "User added sucessfully!" });
  }
});

// Profile of a user
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  const isProfile = await User.findById({ _id: id });

  if (isProfile) {
    res.send(isProfile);
  } else {
    res.status(422).json({ error: "Profile not found!" });
  }
});

// Edit user
router.patch("/edit-user/:id", async (req, res) => {
  const { id } = req.params;

  const { name, age, phone, email, address } = req.body;

  await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
        age: age,
        phone: phone,
        email: email,
        address: address,
      },
    }
  );

  res.status(200).json({ message: "User updated sucessfully!" });
});

// Delete user
router.delete("/delete-user/:id", async (req, res) => {
  const { id } = req.params;

  await User.findOneAndDelete({ _id: id });

  res.status(200).json({ message: "User deleted sucessfully!" });
});

export { router };
