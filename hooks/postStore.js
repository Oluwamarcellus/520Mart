import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { create } from "zustand";
import { db } from "../config/firebase.config";

const usePostStore = create((set, get) => ({
  isFetching: false,
  refreshing: false,
  setRefreshing: (value) => set({ refreshing: value }),
  fetchPost: async ({
    numberOfPost = null,
    searchQuery = null,
    category = null,
    posterId = null,
  } = {}) => {
    try {
      set({ isFetching: true });
      const colRef = collection(db, "posts");
      let q = query(
        colRef,
        orderBy("created_at", "desc"),
        orderBy("__name__", "desc")
      );
      if (numberOfPost) {
        q = query(q, limit(numberOfPost));
      }
      if (category) {
        q = query(q, where("category", "==", category));
      }

      if (posterId) {
        q = query(q, where("poster_id", "==", posterId));
      }
      if (searchQuery) {
        q = query(
          colRef,
          where("title_lowercase", ">=", searchQuery),
          where("title_lowercase", "<", searchQuery + "\uf8ff")
        );
      }
      const res = await getDocs(q);
      const posts = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      // console.log(posts);
      return {
        posts,
        lastDoc: res.docs.length > 0 ? res.docs[res.docs.length - 1] : null,
      };
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetching: false, refreshing: false });
    }
  },
  fetchMore: async (numberOfPost = null, lastPost) => {
    try {
      set({ isFetching: true });
      const colRef = collection(db, "posts");
      let q = query(
        colRef,
        orderBy("created_at", "desc"),
        orderBy("__name__", "desc"),
        startAfter(lastPost)
      );
      if (numberOfPost) {
        q = query(q, limit(numberOfPost));
      }

      const res = await getDocs(q);
      const posts = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      // console.log(posts);
      return {
        posts,
        lastDoc: res.docs.length > 0 ? res.docs[res.docs.length - 1] : null,
      };
    } catch (error) {
      console.error(error);
    } finally {
      set({ isFetching: false });
    }
  },
}));

export default usePostStore;
