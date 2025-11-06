import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../config/firebase.config";

const useUserStore = create((set, get) => ({
  userProfile: null,
  setUserProfile: async (user) => set({ userProfile: user }),
  registerUser: async (user) => {
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, user);
      set({ userProfile: user });
    } catch (error) {
      console.error(error);
    }
  },
  fetchUser: async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      set({ userProfile: docSnap.data() });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserStore;
