export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  data = [],
  disabled = false,
  placeholder,
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
              value={value} // Exibe o valor do estado
              onChange={onChange} // Atualiza o estado ao selecionar
              disabled={disabled} // Desabilita o campo se necessário
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
              value={value} // Exibe o valor do estado
              onChange={onChange} // Atualiza o estado ao digitar
              rows="4"
              disabled={disabled} // Desabilita o campo se necessário
            ></textarea>
          </>
        );
      default:
        return (
          <>
            <label className="text-gray-500 pb-2 text-center w-full uppercase font-semibold">
              {label}
            </label>
            <input
              type={type}
              className={`border border-gray-300 rounded-md p-2 mb-2 w-full text-center ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
              placeholder={placeholder || label}
              name={name}
              value={value} // Exibe o valor do estado
              onChange={onChange} // Atualiza o estado ao digitar
              disabled={disabled} // Desabilita o campo se necessário
            />
          </>
        );
    }
  };

  return <>{renderInput()}</>;
};
