export const Input = ({label, type = "text"}) => {
  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <>
            <label className="text-gray-500 pb-2">{label}</label>
            <select
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              name="options"
              id="options"
            >
              <option value="1">Fulano da Silva</option>
              <option value="2">Ciclano da Silva</option>
              <option value="3">Enzo João Pedro Gonçalves</option>
              <option value="4">Valentina Joaquina Pereira</option>
            </select>
          </>
        );
      case "textarea":
        return (
          <>
            <textarea
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
              placeholder={label}
              rows="4"
            ></textarea>
          </>
        );
      default:
        return (
          <input
            type={type}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            placeholder={label}
          />
        );
    }
  };

  return <>{renderInput()}</>;
};
