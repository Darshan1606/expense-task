import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/auth/userSlice";
import { onSignInSuccess, onSignOutSuccess } from "../store/auth/sessionSlice";
import appConfig from "../utils/app.config";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signedIn, token } = useSelector((state) => state.auth.session);

  const signIn = async (data) => {
    try {
      const resp = await login(data);

      if (resp?.success) {
        const token = resp?.token;
        dispatch(onSignInSuccess(token));
        dispatch(setUser(resp?.result));
        navigate(appConfig.authenticatedEntryPath);
        return {
          success: true,
          message: "Login Success",
        };
      } else {
        return {
          success: false,
          message: resp?.message,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        message:
          err?.response?.data?.error?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser());
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  const signOut = async () => {
    handleSignOut();
  };

  return {
    authenticated: token && signedIn ? true : false,
    // authenticated: true,
    signIn,
    signOut,
  };
};

export default useAuth;
