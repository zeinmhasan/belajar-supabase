import { useState, useEffect, useCallback } from 'react';
import { notesService } from '../services/notesService';

export const useNotes = (user) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadNotes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await notesService.getAllNotes();
    
    if (error) {
      setError(error.message);
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchNotes = async () => {
      if (user) {
        await loadNotes();
      } else if (isMounted) {
        setNotes([]);
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, [user, loadNotes]);

  const addNote = async (title, content) => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required!');
      return { error: 'Title and content are required!' };
    }

    setLoading(true);
    const { data, error } = await notesService.createNote(title, content, user.id);
    
    if (error) {
      setError(error.message);
    } else {
      setNotes([data[0], ...notes]);
      setError('');
    }
    setLoading(false);
    return { data, error };
  };

  const deleteNote = async (id) => {
    setLoading(true);
    const { error } = await notesService.deleteNote(id);
    
    if (error) {
      setError(error.message);
    } else {
      setNotes(notes.filter(note => note.id !== id));
    }
    setLoading(false);
    return { error };
  };

  const clearError = () => setError('');

  return {
    notes,
    loading,
    error,
    addNote,
    deleteNote,
    clearError
  };
};