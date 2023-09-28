import { useRef, useState } from "react";
import { Button, Input } from "../../common/index";
import useOnClickOutside from "../../../../hook/outside";
import { Link } from "react-router-dom";
const AddModal = ({ onClose, onSubmit }: any) => {
  const [error, setError] = useState(false);
  const [input, setInput]: any = useState({
    role: "Admin",
  });
  const roleList = [
    {
      id: 1,
      name: "Admin",
      slug: "admin",
    },
    {
      id: 2,
      name: "User",
      slug: "user",
    },
  ];
  const ref: any = useRef();
  useOnClickOutside(ref, () => {
    onClose();
  });
  const getInput = (type: string, keydown: any) => {
    const value = keydown.target.value;
    setInput({
      ...input,
      [type]: value,
    });
  };
  const handleError = () => {
    if (input?.username && input?.password && input?.confirm && input?.password == input?.confirm) {
      onSubmit(input);
    } else {
      setError(true);
    }
  };

  return (
    <div ref={ref} className="p-[30px] bg-white md:min-w-[500px] w-full text-center rounded-[20px]">
      <div className="m-auto">
        <p className="headline1 text-primary1 my-[20px]">Add User</p>
        <div className="flex w-full">
          <div className="text-left min-w-[150px]">
            <p className="min-h-[50px]">Username</p>
            <p className="min-h-[50px]">Password</p>
            <p className="min-h-[50px]">Confirm</p>
            <p className="min-h-[50px]">Role</p>
          </div>
          <div className="w-full">
            <Input error={error} value={input?.username} onChange={(e: any) => getInput("username", e)} className="mb-[10px] w-full"></Input>
            <Input error={error} value={input?.password} onChange={(e: any) => getInput("password", e)} className="mb-[10px] w-full"></Input>
            <Input error={error && input?.password !== input?.confirm} onChange={(e: any) => getInput("confirm", e)} className="mb-[10px] w-full"></Input>
            <select onChange={(e: any) => getInput("role", e)} className="w-full border-[1px] border-black rounded-[8px] p-[8px]">
              {roleList.map((item) => (
                <option>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center mt-[29px] md:body4 caption">
          <Button onClick={handleError} className="bg-green1 text-white md:mr-[10px] mr-[5px]">
            Save
          </Button>
          <Button onClick={onClose} className="bg-neu4 text-neu2">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddModal;
