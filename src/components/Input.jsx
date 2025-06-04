import {IMaskInput} from "react-imask";

export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  data = [],
  placeholder,
  disabled = false,
}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <>
            <label className="text-gray-500 pb-2 text-left w-full">
              {label}
            </label>
            <select
              className={`border border-gray-300 rounded-md p-2 mb-2 w-full ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
            >
              <option value="">Selecione uma opção</option>
              {data.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </>
        );
      case "textarea":
        return (
          <>
            <label className="text-gray-500 pb-2 text-left">{label}</label>
            <textarea
              className={`border border-gray-300 rounded-md p-2 mb-2 w-full ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
              placeholder={label}
              name={name}
              value={value}
              onChange={onChange}
              rows="4"
              disabled={disabled}
            ></textarea>
          </>
        );
      case "cpf":
        return (
          <>
            <label className="text-gray-500 pb-2 text-start w-full uppercase font-semibold">
              {label}
            </label>
            <IMaskInput
              mask="000.000.000-00"
              value={value}
              onAccept={(value) => onChange({target: {name, value}})}
              disabled={disabled}
              className={`border border-gray-300 rounded-md p-2 mb-2 w-full text-start ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
              placeholder={placeholder || label}
              name={name}
            />
          </>
        );
      case "cel":
        return (
          <>
            <label className="text-gray-500 pb-2 text-start w-full uppercase font-semibold">
              {label}
            </label>
            <IMaskInput
              mask="(00) 00000-0000"
              value={value}
              onAccept={(value) => onChange({target: {name, value}})}
              disabled={disabled}
              className={`border border-gray-300 rounded-md p-2 mb-2 w-full text-start ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
              placeholder={placeholder || label}
              name={name}
            />
          </>
        );
      default:
        return (
          <>
            <label className="text-gray-500 pb-2 text-start w-full uppercase font-semibold">
              {label}
            </label>
            <input
              type={type}
              className={`border border-gray-300 rounded-md p-2 mb-2 w-full text-start ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
              placeholder={placeholder || label}
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          </>
        );
    }
  };

  return <>{renderInput()}</>;
};
