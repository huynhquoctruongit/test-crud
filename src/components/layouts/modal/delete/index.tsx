import { useRef } from "react";
import { Button } from "../../common/index";
import useOnClickOutside from "../../../../hook/outside";
import { Link } from "react-router-dom";
const DeleteModal = ({ data, onClose, onSubmit }: any) => {
  const ref: any = useRef();
  useOnClickOutside(ref, () => {
    onClose();
  });

  return (
    <div ref={ref} className="p-[30px] bg-white md:min-w-[500px] w-full text-center rounded-[20px]">
      <div className="m-auto">
        <p className="headline1 text-primary1">Delete User</p>
        <p className="body5 my-[20px]">
          Are you sure to delete user <strong>{data?.username}</strong>?
        </p>
        <div className="flex items-center justify-center mt-[29px] md:body4 caption">
          <Button onClick={() => onSubmit(data)} className="bg-red text-white md:mr-[10px] mr-[5px]">
            Delete
          </Button>
          <Button onClick={onClose} className="bg-neu4 text-neu2">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
