import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import { auth } from "../config/firebase.config";

const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  loading: true,
  signingIn: false,
  signingUp: false,
  isAuthenticated: false,

  signingOut: false,

  initAuth: () => {
    try {
      onAuthStateChanged(auth, (usr) => {
        set({ user: usr || null, isAuthenticated: !!usr, loading: false });
      });
    } catch (error) {
      console.error(error.message);
      set({ error: error.message });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ error: null, signingIn: true });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.code);
      let errorMessage = "Error Signing In";

      if (error.code.includes("auth/user-not-found")) {
        errorMessage = "No account found with this email";
      }
      if (error.code.includes("auth/wrong-password")) {
        errorMessage = "Incorrect password. Please try again";
      }
      if (error.code.includes("auth/invalid-credential")) {
        errorMessage = "Invalid login credentials";
      }
      return errorMessage;
    } finally {
      set({ signingIn: false });
    }
  },

  signUp: async (name, email, password) => {
    try {
      set({ signUpError: null, signingUp: true });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.code);
      let errorMessage = "Error Signing Up";

      if (error.code.includes("weak-password")) {
        errorMessage = "Enter a stronger password";
      }
      if (error.code.includes("auth/email-already-in-use")) {
        errorMessage = "An account with this email already exists";
      }
      if (error.code.includes("auth/invalid-email")) {
        errorMessage = "Please enter a valid email address";
      }
      return errorMessage;
    } finally {
      set({ signingUp: false });
    }
  },

  signOut: async () => {
    set({ signingOut: true });
    await signOut(auth);
    set({ signingOut: false });
  },
}));

export default useAuthStore;
