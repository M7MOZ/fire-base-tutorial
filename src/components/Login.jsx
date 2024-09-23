import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
function Login() {
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in");
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out");
    } catch (error) {
      console.error(error);
  }
}
  return (
    <div>
      <button onClick={loginWithGoogle}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Login;
