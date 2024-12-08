import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// Models
import StaffModel from '../Models/StaffModel.js';

const router = express.Router();

// Sign-up
export const staffsignUp = expressAsyncHandler(async (req, res) => {
  const { name, employeeType, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newStaff = new StaffModel({ name, employeeType, email, password: hashedPassword });
  await newStaff.save();
  res.status(201).json({ message: 'Staff created successfully' });
});

// Sign-in
export const staffSignIn = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const staff = await StaffModel.findOne({ email });
  if (!staff) {
    return res.status(404).json({ message: 'Staff not found' });
  }
  const isMatch = await bcrypt.compare(password, staff.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: staff._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.status(200).json({ token });
});

// Edit staff
export const editStaff = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const updatedStaff = await StaffModel.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json(updatedStaff);
});

// Delete staff
export const deleteStaff = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  await StaffModel.findByIdAndDelete(id);
  res.status(200).json({ message: 'Staff deleted successfully' });
});

export default router;