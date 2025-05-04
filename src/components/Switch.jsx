export const Switch = ({params, onChange}) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={params.value === "true" || params.value === true}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-red-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 peer-focus:ring-offset-2 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
    </label>
  );
};
