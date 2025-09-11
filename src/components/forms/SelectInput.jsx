const SelectInput = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
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
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3 py-2 bg-black/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 font-[Roboto] ${
          disabled
            ? "border-gray-500/50 cursor-not-allowed"
            : error
            ? "border-red-400 focus:ring-red-400/50"
            : "border-green-400/50 focus:ring-green-400/50 hover:border-green-400"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-black text-white">
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-sm mt-1 font-[Roboto]">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;
