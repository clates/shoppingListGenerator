import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default ({ onClick }) => (
  <FontAwesomeIcon
    className="ml-3 text-purple-400 cursor-pointer"
    icon={faEdit}
    onClick={onClick}
  />
);
