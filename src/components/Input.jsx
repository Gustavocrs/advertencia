export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  data = [],
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
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              name={name}
              value={value} // Exibe o valor do estado
              onChange={onChange} // Atualiza o estado ao selecionar
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
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder={label}
              name={name}
              value={value} // Exibe o valor do estado
              onChange={onChange} // Atualiza o estado ao digitar
              rows="4"
            ></textarea>
          </>
        );
      default:
        return (
          <>
            <label className="text-gray-500 pb-2 text-left w-full">
              {label}
            </label>
            <input
              type={type}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder={label}
              name={name}
              value={value} // Exibe o valor do estado
              onChange={onChange} // Atualiza o estado ao digitar
            />
          </>
        );
    }
  };

  return <>{renderInput()}</>;
};
