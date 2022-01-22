import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonStyled from "./ButtonStyled";

export default ({
  onClick,
  label,
  icon,
  color = "emerald",
  className = "",
}) => (
  <div className={className}>
    <ButtonStyled
      color={color}
      className="group px-4 transition-all duration-150 hover:animate-pulse"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <FontAwesomeIcon icon={icon} />
        <span className="block whitespace-nowrap group-hover:ml-3 overflow-hidden w-0 group-hover:w-fit">
          {label}
        </span>
      </div>
    </ButtonStyled>
  </div>
);
