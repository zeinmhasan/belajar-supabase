import { supabase } from '../lib/supabaseClient';

export const notesService = {
  async getAllNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  async createNote(title, content, userId) {
    const { data, error } = await supabase
      .from('notes')
      .insert({
        title,
        content,
        user_id: userId
      })
      .select();
    
    return { data, error };
  },

  async deleteNote(id) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    return { error };
  },

  async updateNote(id, updates) {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select();
    
    return { data, error };
  }
};