const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.register =  async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "User already registered" });
      }
      bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
          return res.status(500).send("Error hashing password");
        }
        const user = new UserModel({
          username,
          email,
          password: hash,
          role
        });
        await user.save();
        res.status(200).send("User registered successfully");
      });
    } catch (error) {
      res.status(500).send("Internal error || error in registering user");
    }
  };


  exports.delete= async (req, res) => {
    const { userId } = req.body; 
    const { noteId } = req.params;

    try {
        const note = await NoteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this note" });
        }

        await NoteModel.deleteOne({ _id: noteId });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal Server Issue || Error deleting note", error });
    }
};