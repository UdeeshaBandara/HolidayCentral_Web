import {Navigate} from "react-router-dom";
import useToken from "../../hooks/useToken";

export const ProtectedRoute = ({children}) => {
    const {token} = useToken();
    if (token === null || token === '') {
        return <Navigate to="/login" replace/>;
    }
    return children;
};
