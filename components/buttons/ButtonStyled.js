export default ({
  onClick = () => {},
  children,
  color = "blue",
  className = "",
}) => {
  let focusBgColor = "bg-blue-400";
  let activeBgColor = "bg-blue-600";
  let hoverBgColor = "bg-blue-500";
  let bgColor = "bg-blue-400";
  switch (color) {
    case "emerald":
      focusBgColor = "bg-emerald-400";
      activeBgColor = "bg-emerald-600";
      hoverBgColor = "bg-emerald-500";
      bgColor = "bg-emerald-400";
      break;
    case "amber":
      focusBgColor = "bg-amber-400";
      activeBgColor = "bg-amber-600";
      hoverBgColor = "bg-amber-500";
      bgColor = "bg-amber-400";
      break;
    case "purple":
      focusBgColor = "bg-purple-400";
      activeBgColor = "bg-purple-600";
      hoverBgColor = "bg-purple-500";
      bgColor = "bg-purple-400";
      break;
    case "slate":
      focusBgColor = "bg-slate-400";
      activeBgColor = "bg-slate-600";
      hoverBgColor = "bg-slate-500";
      bgColor = "bg-slate-400";
      break;
  }
  return (
    <button
      type="button"
      className={`inline-block px-6 py-2.5 ${bgColor} text-white 
    font-medium text-xs leading-tight uppercase rounded 
    shadow-md hover:${hoverBgColor} hover:shadow-lg 
    focus:${focusBgColor} focus:shadow-lg focus:outline-none 
    focus:ring-0 active:${activeBgColor} active:shadow-lg transition 
    duration-150 ease-in-out ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
