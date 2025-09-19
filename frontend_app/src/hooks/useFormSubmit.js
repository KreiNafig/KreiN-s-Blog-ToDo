import { useCallback } from 'react';

export const useFormSubmit = (validationCheck, onSubmit) => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (validationCheck()) {
      alert('Ошибка в форме');
      return;
    }

    onSubmit();
  }, [validationCheck, onSubmit]);

  return handleSubmit;
};