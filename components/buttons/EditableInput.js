import {
  faCheckSquare,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EditButton from "./EditButton";
import InputStyled from "../input/InputStyled";

export default ({ value, placeholder, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inValue, setInValue] = useState(value);

  return isEditing ? (
    <div className="flex text-xl align-middle items-center">
      <InputStyled
        placeholder={placeholder}
        value={inValue}
        onChange={(e) => setInValue(e.target.value)}
        onBlur={() => {
          if (!inValue) {
            setInValue(value);
            setIsEditing(false);
          }
        }}
        className={inValue || "border-5 border-rose-400  focus:border-rose-600"}
      />
      <FontAwesomeIcon
        className={`ml-3 fa-lg cursor-pointer ${
          inValue ? "text-emerald-400" : "text-slate-300 pointer-events-none"
        }`}
        icon={faCheckSquare}
        onClick={() => {
          if (inValue) {
            onChange(inValue);
            setIsEditing(false);
          }
        }}
      />
      <FontAwesomeIcon
        className="ml-3 fa-lg cursor-pointer text-red-600"
        icon={faWindowClose}
        onClick={() => {
          setInValue(value);
          setIsEditing(false);
        }}
      />
    </div>
  ) : (
    <>
      {value}
      <EditButton onClick={() => setIsEditing(true)} />
    </>
  );
};
