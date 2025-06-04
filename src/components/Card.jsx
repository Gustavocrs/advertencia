export const Card = ({title, icon, onClick, disabled}) => {
  return (
    <div
      className="md:w-60 w-full h-24 p-6 bg-slate-300 rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-400 transition-colors duration-200"
      onClick={onClick}
      disabled={disabled || true}
    >
      <div className="text-6xl text-slate-800 mb-2">{icon}</div>
      <p>{title}</p>
    </div>
  );
};
