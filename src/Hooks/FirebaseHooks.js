import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
    return useContext(AuthContext);
};

export { useAuth };