import { containerClasses } from "@mui/material";
import { createContext, useContext, useReducer } from "react";
import reducerPosts from "../reducer/reducerPosts";
const Posts = createContext([]);
export default function PostsProvider({ children }) {
  const [posts, dispatch] = useReducer(reducerPosts, null);
  return (
    <Posts.Provider value={{ posts, dispatch }}>{children}</Posts.Provider>
  );
}

export const usePosts = () => {
  return useContext(Posts);
};
