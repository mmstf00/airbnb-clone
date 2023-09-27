"use client";

import { Toaster } from "react-hot-toast";

// Wrapping up with Client Parent, and not importing directly
const ToasterProvider = () => {
  return <Toaster />;
};

export default ToasterProvider;
