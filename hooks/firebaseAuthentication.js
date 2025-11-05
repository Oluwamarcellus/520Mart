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
  signingOut: false,

  initAuth: () => {
    try {
      onAuthStateChanged(auth, (usr) => {
        set({ user: usr || null });
      });
    } catch (error) {
      console.error(error.message);
      set({ error: error.message });
    } finally {
      if (get().loading) set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ error: null, signingIn: true });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
      set({ error: error.message });
    } finally {
      set({ signingIn: false });
    }
  },

  signUp: async (name, email, password) => {
    try {
      set({ error: null, signingUp: true });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error.message);
      set({ error: error.message });
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
