export const RadioGroup = ({
  label,
  name,
  options = [],
  value,
  onChange,
  type = "default",
}) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    // Envia o texto do label correspondente ao valor selecionado
    onChange({
      target: {
        name,
        value: selectedOption?.label || "",
      },
    });
  };

  const renderRadioGroup = () => {
    return (
      <div
        className={
          type === "inline" ? "flex space-x-4" : "flex flex-col space-y-2"
        }
      >
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.label} // Compara com o texto do label
              onChange={handleChange}
              className="form-radio text-sky-600"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full p-4 rounded-lg shadow-md mb-4 border-1 border-zinc-200">
      <p className="font-semibold mb-4 text-center uppercase">{label}</p>
      {renderRadioGroup()}
    </div>
  );
};
