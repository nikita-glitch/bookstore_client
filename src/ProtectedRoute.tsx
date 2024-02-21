import { Navigate, Outlet } from "react-router-dom";
import { UserInterface } from "./interfaces/interfaces";

const ProtectedRoute = ({
  user,
  children,
}: {
  user: UserInterface;
  children?: JSX.Element;
}) => {
  if (!user?.id) {
    return <Navigate to="/books" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
