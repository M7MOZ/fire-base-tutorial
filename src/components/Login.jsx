import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
function Login() {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };
  return <button onClick={loginWithGoogle}>login</button>;
}

export default Login;
