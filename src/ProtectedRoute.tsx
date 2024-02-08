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
    avatarId: string;
  };
  children?: JSX.Element;
}) => {
  console.log(user);
  
  if (user.id === "" && user.id === undefined) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
