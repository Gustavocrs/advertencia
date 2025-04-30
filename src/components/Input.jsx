export const Input = ({label, type = "text"}) => {
  return (
    <>
      {type === "select" ? (
        <>
          <label className="text-gray-500 pb-2">{label}</label>
          <select
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            name="cars"
            id="cars"
          >
            <option value="1">Fulano da Silva</option>
            <option value="2">Ciclano da Silva</option>
            <option value="3">Enzo João Pedro Gonçalves</option>
            <option value="4">Valentina Joaquina Pereira</option>
          </select>
        </>
      ) : (
        <input
          type={type}
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          placeholder={label}
        />
      )}
    </>
  );
};
