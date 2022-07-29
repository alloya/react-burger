import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [changed, setChanged] = useState(false);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    setChanged(true);
  };

  const resetChange = () => {
    setChanged(false);
  }
  
  return {values, handleChange, setValues, changed, resetChange};
}