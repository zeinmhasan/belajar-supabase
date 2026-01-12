import { LogOut } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useNotes } from './hooks/useNotes';
import { AuthForm } from './components/auth/AuthForm';
import { NoteForm } from './components/notes/NoteForm';
import { NoteList } from './components/notes/NoteList';

function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { notes, error, addNote, deleteNote } = useNotes(user);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onSignIn={signIn} onSignUp={signUp} loading={authLoading} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          <NoteForm onAddNote={addNote} error={error} />
        </div>

        <NoteList notes={notes} onDelete={deleteNote} />
      </div>
    </div>
  );
}

export default App;