import { Button, Input } from "@/components/layouts/common/index";
import { Menu } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axiosClient from "@/libs/api/axios-client";
import Modal from "@/components/layouts/modal/template";
import EditModal from "@/components/layouts/modal/edit/index";
import DeleteModal from "@/components/layouts/modal/delete/index";
import AddModal from "@/components/layouts/modal/add/index";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";
const lenghtMinPage = 0;
const lenghtMaxPage = 5;

const ManageUser = () => {
  const [role, setRole] = useState("");
  const [userList, setUserList] = useState([]);
  const [searchList, setSearchList] = useState(null);
  const [editModal, setEditModal]: any = useState({});
  const [deleteModal, setDeleteModal]: any = useState({});
  const [addModal, setAddModal]: any = useState({});
  const [pagination, setPagination]: any = useState({
    firstPage: lenghtMinPage,
    lastPage: lenghtMaxPage,
  });
  const [input, setInput]: any = useState({
    role: "Admin",
  });
  useEffect(() => {
    getUserList();
  }, []);

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
  const getUserList = () => {
    axiosClient.get("/getProducts").then((result: any) => {
      setUserList(result.data);
    });
  };

  const onDelete = async (item: any) => {
    const result = await axiosClient.delete(`/getProducts/${item.id}`);
    if (result) {
      toast.success("Delete successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDeleteModal({
        data: [],
        status: false,
      });
      getUserList();
    }
  };

  const onAdd = async (item: object) => {
    const result = await axiosClient.post(`/getProducts`, item);
    if (result) {
      toast.success("Add successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getUserList();
      setAddModal({
        data: [],
        status: false,
      });
    }
  };
  const onEdit = async (item: any) => {
    const result = await axiosClient.put(`/getProducts/${item.id}`, item);
    if (result) {
      toast.success("Edit successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getUserList();
      setEditModal({
        data: [],
        status: false,
      });
    }
  };
  const getInput = (type: string, keydown: any) => {
    const value: string = keydown?.target?.value;
    setInput({
      ...input,
      [type]: value,
    });
  };

  const onSearch = () => {
    let result: any = null;
    if (input?.id && input?.username && role) {
      const timTheoIdVaName = userList.filter((item: any) => item.id == input?.id && item.username == input?.username && item.role.toLowerCase() == role);
      if (timTheoIdVaName) {
        result = timTheoIdVaName;
      }
    } else {
      const timTheoId = input?.id ? userList.filter((item: any) => item.id == input?.id) : null;
      const timTheoName = input?.username ? userList.filter((item: any) => item.username === input?.username) : null;
      const timTheoRole = role ? userList.filter((item: any) => item.role.toLowerCase() == role) : null;
      result = timTheoId || timTheoName || timTheoRole;
    }
    setSearchList(result);
  };
  const resetListToInitialState = () => {
    setInput({
      username: "",
      id: "",
    });
    setRole("");
    setSearchList(null);
  };
  let firstPage = pagination.firstPage;
  let lastPage = pagination.lastPage;

  console.log(lastPage, "lastPage");

  const onPagination = (status: string) => {
    if (status === "next") {
      if (userList?.length - 1 > lastPage) {
        setPagination({
          firstPage: parseInt(lastPage) + lenghtMinPage + 1,
          lastPage: parseInt(lastPage) + lenghtMaxPage + 1,
        });
      }
    } else {
      if (firstPage !== 0) {
        setPagination({
          firstPage: parseInt(firstPage) - lenghtMaxPage - 1,
          lastPage: parseInt(firstPage) - lenghtMinPage - 1,
        });
      }
    }
  };
  console.log(pagination, "pagination");

  const renderList = searchList !== null ? searchList : userList;

  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
      <Modal open={editModal.status}>
        <EditModal
          onSubmit={(e: any) => onEdit(e)}
          data={editModal.data}
          onClose={() => {
            setEditModal({
              data: [],
              status: false,
            });
          }}
        />
      </Modal>
      <Modal open={addModal?.status}>
        <AddModal
          onSubmit={(e: Object) => onAdd(e)}
          onClose={() => {
            setAddModal({
              data: [],
              status: false,
            });
          }}
        />
      </Modal>
      <Modal open={deleteModal?.status}>
        <DeleteModal
          onSubmit={(e: any) => onDelete(e)}
          data={deleteModal?.data}
          onClose={() => {
            setDeleteModal({
              data: [],
              status: false,
            });
          }}
        />
      </Modal>
      <div className="w-[60%] mt-[100px] mx-auto">
        <h1 className="text-center">Manage User</h1>
        <div className="mb-[12px] flex">
          <div>
            <Input value={input?.id} onChange={(e: string) => getInput("id", e)} placeHolder="ID" className="mb-[12px]" />
            <Input value={input?.username} onChange={(e: string) => getInput("username", e)} placeHolder="Username" />
          </div>
          <div>
            <select className="border-[1px] border-[gray] rounded-[20px] ml-[30px] px-[20px] py-[10px]" onChange={(e) => setRole(e.target.value)}>
              <option disabled selected={role == ""}>
                Select
              </option>
              {roleList.map((item) => (
                <option value={item.slug}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mt-[20px]">
          <div className="flex items-center">
            <Button className="bg-primary1 text-white mr-[12px]" onClick={onSearch}>
              Search
            </Button>
            <Button className="bg-red text-white" onClick={resetListToInitialState}>
              Clear
            </Button>
          </div>
          <Button
            className="bg-green1 text-white"
            onClick={() =>
              setAddModal({
                data: [],
                status: true,
              })
            }
          >
            Add User
          </Button>
        </div>
        <div className="flex justify-end my-[20px]">
          <p onClick={() => onPagination("prev")} className="cursor-pointer">
            {"<"} Prev
          </p>
          <p className="mx-[20px]">{pagination?.firstPage + "/" + pagination?.lastPage}</p>
          <p onClick={() => onPagination("next")} className="cursor-pointer">
            Next {">"}
          </p>
        </div>

        <div className="mt-[20px]" id="user-table">
          <table className="w-full text-center">
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            {renderList?.slice(pagination?.firstPage, pagination?.lastPage)?.map((item: any, index: number) => (
              <tr>
                <td>{index + 1 + firstPage}</td>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() =>
                        setDeleteModal({
                          data: item,
                          status: true,
                        })
                      }
                      className="bg-red text-white mr-[12px]"
                    >
                      Delete
                    </Button>
                    <Button
                      className="bg-primary1 text-white mr-[12px]"
                      onClick={() =>
                        setEditModal({
                          data: item,
                          status: true,
                        })
                      }
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default ManageUser;
