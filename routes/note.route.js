const express = require("express");
const NoteModel = require("../model/note.model");
const auth = require("../middleware/auth.middleware");
const noteRouter = express.Router();



noteRouter.post("/create", auth, async (req, res) => {
    const { title, description, status, userId, userName, userEmail } = req.body;

    console.log("Request Body:", req.body);

    try {
        const note = new NoteModel({ title, description, status, userId, userName, userEmail });
        await note.save();
        res.status(200).json({ message: "Note created successfully" });
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Internal Server Issue || Error in creating notes", error });
    }
});



noteRouter.get("/all", auth, async (req, res) => {
    const {userId} = req.body
    try {
        const notes = await NoteModel.find({userId});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Internal Server Issue || Error in fetching notes", error });
    }
});


noteRouter.put("/update/:id", auth, async (req, res) => {
    const { title, description, status, userId } = req.body;
    const { id } = req.params;

    try {
        const note = await NoteModel.findById(id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.userId !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this note" });
        }

        await NoteModel.updateOne(
            { _id: id },
            { $set: { title, description, status } }
        );

        res.status(200).send(`Note with id ${id} updated`);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal Server Issue || Error updating note", error });
    }
});

noteRouter.delete("/delete/:noteId", auth, async (req, res) => {
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
});



module.exports = noteRouter;
