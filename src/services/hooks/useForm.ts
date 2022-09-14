import { TForm } from './../../utils/types/form';
import { useState } from "react";

export function useForm(inputValues: TForm) {
  const [values, setValues] = useState(inputValues);
  const [changed, setChanged] = useState(false);

  const handleChange = (event: any) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    setChanged(true);
  };

  const resetChange = () => {
    setChanged(false);
  }
  
  return {values, handleChange, setValues, changed, resetChange};
}