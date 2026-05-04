import { useState, useEffect } from 'react';

function Toast({ message, type = 'info', onClose, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`toast toast-${type} ${visible ? 'toast-enter' : 'toast-exit'}`}>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={handleClose} aria-label="Close">×</button>
    </div>
  );
}

export default Toast;
