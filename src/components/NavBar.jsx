import Profile from "./Profile";

export const NavBar = ({user}) => {
  return (
    <div
      className={`w-full h-14 bg-gradient-to-r from-slate-300 to-slate-500 fixed z-10
      flex items-center justify-between text-slate-800 
      font-semibold select-none 
    `}
    >
      <div className="w-full flex justify-end items-center gap-4 mr-4 text-2xl">
        <Profile user={user} />
      </div>
    </div>
  );
};
