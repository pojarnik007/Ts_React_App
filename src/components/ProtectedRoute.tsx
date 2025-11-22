import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedProps) {
  const token = useSelector((state: any) => state.auth.token);
  const loading = useSelector((state: any) => state.auth.loading);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      const id = setTimeout(() => setReady(true), 0);
      return () => clearTimeout(id);
    }
  }, [loading]);

  if (!ready) return null;

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
