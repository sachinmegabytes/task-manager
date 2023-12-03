const InputField = ({
  type,
  isRequired,
  label,
  labelName,
  name,
  placeholder,
  fieldPrefix,
  value,
  defaultValue,
  onChange,
}) => {
  // A reusable custom input field
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col space-y-4">
        <label
          name={labelName}
          className="block text-sm font-medium leading-6 text-gray-900 mt-4"
        >
          {label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{fieldPrefix}</span>
          </div>
          <input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type={type}
            required={isRequired}
            name={name}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InputField;
