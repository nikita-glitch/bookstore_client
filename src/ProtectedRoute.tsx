import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  user,
  children,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    cart: string;
    favorite: string;
    avatar: string;
  };
  children?: JSX.Element;
}) => {
  if (user.id === "" || user.id === undefined) {
    return <Navigate to="/books" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
