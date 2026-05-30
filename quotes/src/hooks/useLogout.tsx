import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

function useLogout() {
  const navigate = useNavigate();

  return useCallback(() => {
    void signOut(auth);
    navigate("/Login");
  }, [navigate]);
}

export default useLogout;
