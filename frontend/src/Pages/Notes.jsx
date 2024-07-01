import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteItem from '../components/NoteItem';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '', status: 'to-do' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('api/notes/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Error fetching notes');
    }
  };

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('api/notes/create', newNote, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Error creating note');
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate}>
        <input name="title" type="text" onChange={handleChange} placeholder="Title" required />
        <input name="description" type="text" onChange={handleChange} placeholder="Description" required />
        <select name="status" onChange={handleChange}>
          <option value="to-do">To-do</option>
          <option value="in-progress">In-progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Create Note</button>
      </form>
      <div>
        {notes.map(note => (
          <NoteItem key={note._id} note={note} fetchNotes={fetchNotes} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
