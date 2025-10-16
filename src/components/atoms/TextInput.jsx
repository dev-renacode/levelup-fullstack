const TextInput = ({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  labelColor = "text-green-400",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block ${labelColor} font-bold text-sm mb-2 font-[Roboto]`}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 bg-black/50 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 font-[Roboto] ${
          error
            ? "border-red-400 focus:ring-red-400/50"
            : "border-green-400/50 focus:ring-green-400/50 hover:border-green-400"
        }`}
        placeholder={placeholder}
      />
      {error && (
        <div className="flex items-center space-x-1 mt-1 animate-fade-in">
          <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400 text-sm font-[Roboto]">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
