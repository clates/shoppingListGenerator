import InputStyled from "./InputStyled";

export default ({ label, value, placeholder, onChange }) => (
  <div className="mb-3">
    <label
      for="exampleFormControlInput1"
      className="form-label inline-block mb-2 text-gray-700"
    >
      {label}
    </label>
    <InputStyled value={value} placeholder={placeholder} onChange={onChange} />
  </div>
);
