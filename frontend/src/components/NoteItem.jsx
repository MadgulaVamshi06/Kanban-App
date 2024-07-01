import React, { useState } from 'react';
import axios from 'axios';

const NoteItem = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({ ...note });

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`api/notes/delete/${note._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note');
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`api/notes/update/${note._id}`, updatedNote, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsEditing(false);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Error updating note');
    }
  };

  const handleChange = (e) => {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input name="title" type="text" value={updatedNote.title} onChange={handleChange} required />
          <input name="description" type="text" value={updatedNote.description} onChange={handleChange} required />
          <select name="status" value={updatedNote.status} onChange={handleChange}>
            <option value="to-do">To-do</option>
            <option value="in-progress">In-progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <p>{note.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
