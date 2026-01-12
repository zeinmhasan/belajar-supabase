import { NoteItem } from './NoteItem';

export const NoteList = ({ notes, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No notes yet. Create your first note above! 📝
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};