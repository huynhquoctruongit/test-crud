export const Input = ({ error, value, disabled, children, placeHolder, onChange, className }: any) => {
  return (
    <input
      key={placeHolder}
      value={value}
      disabled={disabled}
      defaultValue={value}
      onChange={(e) => onChange(e)}
      placeholder={placeHolder}
      className={`${error && !value ? "border-red" : "border-[gray]" } ${className} border-[1px] h-[40px] px-[30px] w-fit rounded-full flex items-center`}
    ></input>
  );
};
