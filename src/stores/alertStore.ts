import { useState } from 'react';

export const useAlertStore = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openAlert = () => setIsOpen(true);
  const closeAlert = () => setIsOpen(false);

  return { isOpen, openAlert, closeAlert };
}; 