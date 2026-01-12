import { Trash2 } from 'lucide-react';

export const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
        <button
          onClick={() => onDelete(note.id)}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete note"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
      <p className="text-xs text-gray-400 mt-3">
        {new Date(note.created_at).toLocaleString('id-ID')}
      </p>
    </div>
  );
};