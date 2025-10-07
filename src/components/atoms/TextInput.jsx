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
        <p className="text-red-400 text-sm mt-1 font-[Roboto]">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
