import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "./slice/contentSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);
  const contents = useSelector((state) => state.content.contents);
  const isLoading = useSelector((state) => state.content.isLoading);
  const error = useSelector((state) => state.content.error);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

  return <div>{console.log(contents)}</div>;
};

export default App;
