import { useState } from "react";

// Custom form hook
export const useForm = (callback, initState = {}) => {
  const [values, setValues] = useState(initState);
  // Handles input
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // Handles submitting a form
  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
