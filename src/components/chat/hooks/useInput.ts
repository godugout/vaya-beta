
import { useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState("");
  
  return {
    input,
    setInput,
  };
};
