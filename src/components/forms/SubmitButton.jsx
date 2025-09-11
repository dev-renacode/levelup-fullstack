const SubmitButton = ({ children, className = "", disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold px-8 py-3 rounded-full hover:from-green-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-green-400/25 text-base font-[Roboto] group ${
        disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""
      } ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {disabled && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
        {!disabled && (
          <span
            className="group-hover:translate-x-1 transition-transform duration-300"
            aria-hidden="true"
          >
            →
          </span>
        )}
      </span>
    </button>
  );
};

export default SubmitButton;
