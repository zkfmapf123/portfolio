import { useCallback, useState } from "react"

export const useInput = (initValue: string | number, validation: Function, nextFunction: Function) => {
  const [value, setValue] = useState(initValue);

  // 값 변경 + validation
  const onChange = useCallback(e => {
    const { text } = e.nativeEvent;
    setValue(text);

    let isValidation: boolean = validation(text);

    if (!isValidation) {
      // ToastMessage
      setValue("")
    };
  }, [value]);

  const submitButton = async () => {
    await nextFunction(value);
  };

  return { value, onChange, submitButton };
};