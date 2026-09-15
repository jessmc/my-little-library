import { useAuth } from "~/context/AuthContext";
import ProtectedRoute from "~/components/ProtectedRoute";

function LibraryContent() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Library</h1>
      <p>Welcome, {user?.email}!</p>
    </div>
  );
}

export default function LibraryPage() {

  return (
    <ProtectedRoute>
      <LibraryContent />
    </ProtectedRoute>
  );
}
