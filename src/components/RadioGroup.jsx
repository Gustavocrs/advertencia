export const RadioGroup = ({label, options = [], type = "default"}) => {
  const renderRadioGroup = () => {
    switch (type) {
      case "inline":
        return (
          <div className="">
            {options.map((option, index) => (
              <label key={index} className="">
                <input
                  type="radio"
                  name={label}
                  value={option.value}
                  className="form-radio text-sky-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case "stacked":
        return (
          <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={label}
                  value={option.value}
                  className="form-radio text-green-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={label}
                  value={option.value}
                  className="form-radio text-gray-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full p-4 rounded-lg shadow-md mb-4 border-1 border-zinc-200">
      <p className="font-semibold mb-4 text-center uppercase">{label}</p>
      {renderRadioGroup()}
    </div>
  );
};
