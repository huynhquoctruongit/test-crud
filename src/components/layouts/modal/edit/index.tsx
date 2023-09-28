import { useRef, useState } from "react";
import { Button, Input } from "../../common/index";
import useOnClickOutside from "../../../../hook/outside";
import { Link } from "react-router-dom";
const EditModal = ({ data, onClose, onSubmit }: any) => {
  const [error, setError] = useState(false);
  const [input, setInput]: any = useState({
    id: data?.id,
    role: data?.role,
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
  const getInput = (type: string, keydown:any) => {
    const value = keydown.target.value;
    setInput({
      ...input,
      [type]: value,
    });
  };
  const handleError = () => {
    if (input?.username !== "" && data?.username && (input?.password || data?.password) && input?.confirm && (input?.password || data?.password) == input?.confirm) {
      onSubmit(input);
    } else {
      setError(true);
    }
  };

  return (
    <div ref={ref} className="p-[30px] bg-white md:min-w-[500px] w-full text-center rounded-[20px]">
      <div className="m-auto">
        <p className="headline1 text-primary1">Edit User</p>
        <p className="body5 my-[20px]">Once you submit your work, you won't be able to make any edits. If you're certain, click 'Yes, I'm ready' to proceed.</p>
        <div className="flex w-full">
          <div className="text-left min-w-[150px]">
            <p className="min-h-[50px]">ID</p>
            <p className="min-h-[50px]">Username</p>
            <p className="min-h-[50px]">Password</p>
            <p className="min-h-[50px]">Confirm</p>
            <p className="min-h-[50px]">Role</p>
          </div>
          <div className="w-full">
            <Input disabled className="mb-[10px] w-full bg-neu4 cursor-not-allowed" placeHolder="ID" value={input?.id || data?.id}></Input>
            <Input
              error={error}
              onChange={(e: any) => getInput("username", e)}
              className="mb-[10px] w-full"
              placeHolder="Username"
              value={input?.username !== undefined ? input?.username : data?.username}
            ></Input>
            <Input
              error={error}
              onChange={(e: any) => getInput("password", e)}
              className="mb-[10px] w-full"
              placeHolder="Password"
              value={input?.password !== undefined ? input?.password : data?.password}
            ></Input>
            <Input
              error={error && (input?.password || data?.password) !== input?.confirm}
              onChange={(e: any) => getInput("confirm", e)}
              className="mb-[10px] w-full"
              placeHolder="Confirm"
            ></Input>
            <select onChange={(e: any) => getInput("role", e)} className="w-full border-[1px] border-black rounded-[8px] p-[8px]">
              {roleList.map((item) => (
                <option selected={item.slug === data?.role}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center mt-[29px] md:body4 caption">
          <Button onClick={handleError} className="bg-primary1 text-white md:mr-[10px] mr-[5px]">
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
export default EditModal;
