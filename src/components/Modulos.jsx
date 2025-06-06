import {useRouter} from "next/navigation";

export const Modulos = ({
  title,
  titleIcon,
  texto1,
  icon1,
  texto2,
  icon2,
  route1,
  route2,
  disabled,
}) => {
  const router = useRouter();

  return (
    <div
      className={`md:w-80 w-[90%] h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl p-4 text-slate-800 shadow-2xl mb-4 ${
        disabled ? "opacity-60 pointer-events-none grayscale" : ""
      }`}
      disabled={disabled}
    >
      <div className="flex justify-center items-center">
        {titleIcon && (
          <div className="flex justify-center items-center text-4xl text-zinc-600">
            {titleIcon}
          </div>
        )}
        <h1 className="w-full text-center text-2xl font-bold py-4 tracking-wide text-slate-800">
          {title}
        </h1>
      </div>
      <div
        className={`w-full flex items-center gap-2 bg-zinc-200 rounded-lg py-3 my-4 shadow-md hover:bg-white cursor-pointer transition-colors duration-200 ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && router.push(route1)}
      >
        {icon1 && (
          <div className="w-[30%] flex justify-center items-center text-4xl text-zinc-600">
            {icon1}
          </div>
        )}
        {texto1 && (
          <p className="w-full text-center text-lg font-semibold text-zinc-800">
            {texto1}
          </p>
        )}
      </div>
      <div
        className={`w-full flex items-center gap-2 bg-zinc-200 rounded-lg py-3 my-4 shadow-md hover:bg-white cursor-pointer transition-colors duration-200 ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && router.push(route2)}
      >
        {icon2 && (
          <div className="w-[30%] flex justify-center items-center text-4xl text-zinc-600">
            {icon2}
          </div>
        )}
        {texto2 && (
          <p className="w-full text-center text-lg font-semibold text-zinc-800">
            {texto2}
          </p>
        )}
      </div>
    </div>
  );
};
