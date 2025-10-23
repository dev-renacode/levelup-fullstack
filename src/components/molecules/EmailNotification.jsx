import { useEffect } from 'react';

const EmailNotification = ({ 
  isVisible, 
  isSuccess, 
  message, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`max-w-sm bg-white rounded-lg shadow-lg border-l-4 ${
        isSuccess 
          ? 'border-green-500 bg-green-50' 
          : 'border-red-500 bg-red-50'
      }`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {isSuccess ? (
                <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${
                isSuccess ? 'text-green-800' : 'text-red-800'
              }`}>
                {isSuccess ? 'Email enviado exitosamente' : 'Error al enviar email'}
              </p>
              <p className={`text-sm ${
                isSuccess ? 'text-green-700' : 'text-red-700'
              }`}>
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 ${
                  isSuccess 
                    ? 'text-green-500 hover:bg-green-100' 
                    : 'text-red-500 hover:bg-red-100'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSuccess ? 'focus:ring-green-600' : 'focus:ring-red-600'
                }`}
              >
                <span className="sr-only">Cerrar</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
