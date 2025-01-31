import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { CirclePlus, Pencil, RefreshCcw, Trash } from "lucide-react";
import Thead from "../../components/ui/table/thead";
import { PAGE_SIZE } from "../../constants/app.constant";
import {
  deleteUser,
  getAllUsers,
  changeUserStatus,
} from "../../services/userService";
import UserForm from "./userForm";
import Dialog from "../../components/ui/dialog";
import Pagination from "../../components/template/pagination";
import useToast from "../../hooks/useToast";

const headers = ["Name", "Email", "Status", "Action"];

const Users = () => {
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userFlag, setUserFlag] = useState(false);
  const [filters, setFilters] = useState({
    currentPage: 1,
    total: 0,
    search: "",
  });

  const [selectedData, setSelectedData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  useEffect(() => {
    setUserFlag(true);
  }, []);

  const getUsers = useCallback(async () => {
    if (userFlag) {
      try {
        setLoading(true);
        const payload = {};
        if (filters?.search?.length > 2) {
          payload.search = filters?.search;
        }
        const resp = await getAllUsers(
          payload,
          filters?.currentPage,
          PAGE_SIZE
        );
        if (resp?.success) {
          setUsers(resp?.data);
          setFilters({
            ...filters,
            currentPage: resp?.pagination?.currentPage,
            total: resp?.pagination?.totalRecords,
          });
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false);
        setUserFlag(false);
      }
    }
    // eslint-disable-next-line
  }, [userFlag]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const closeFormDialog = () => {
    setSelectedData();
    setIsModalOpen(false);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  const closeStatusDialog = () => {
    setIsStatusOpen(false);
  };

  const onDelete = async () => {
    try {
      const resp = await deleteUser(selectedData?.id);

      if (resp?.success) {
        successToast(resp?.message);
      }
    } catch (err) {
      console.log("err", err);
      errorToast(
        err?.response?.data?.error?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.response?.message
      );
    } finally {
      setUserFlag(true);
      setIsDeleteOpen(false);
    }
  };

  const onChangeStatus = async () => {
    try {
      let status = selectedData?.status === "active" ? "inactive" : "active";
      const resp = await changeUserStatus(selectedData?.id, { status });

      if (resp?.success) {
        //  toast
      }
    } catch (err) {
      console.log("err", err);
      //  toast
    } finally {
      setUserFlag(true);
      setIsStatusOpen(false);
    }
  };

  const paginate = (pageNumber) => {
    setFilters({
      ...filters,
      currentPage: pageNumber,
    });
    setUserFlag(true);
  };

  const previousPage = () => {
    if (filters?.currentPage !== 1) {
      setFilters({
        ...filters,
        currentPage: filters?.currentPage - 1,
      });
    }
    setUserFlag(true);
  };

  const nextPage = () => {
    if (filters?.currentPage !== Math.ceil(filters?.total / PAGE_SIZE)) {
      setFilters({
        ...filters,
        currentPage: JSON.parse(filters?.currentPage) + 1,
      });
    }
    setUserFlag(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-primary-dark font-bold mb-4">Users</h2>
        <Button
          startIcon={<CirclePlus />}
          size="small"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Create User
        </Button>
      </div>
      <div className="overflow-x-auto shadow-primary p-4 rounded-md">
        <table className="min-w-full bg-white ">
          {/* Table Head */}
          <Thead headers={headers} />

          {/* Table Body */}
          {loading ? (
            <tr>
              <td colSpan={headers.length} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            <tbody className="text-sm">
              {users?.length > 0 ? (
                users?.map((user, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      users?.length === rowIndex + 1 ? "" : "border-b"
                    } hover:bg-gray-50 `}
                  >
                    <td className="p-2">{user?.name}</td>
                    <td className="p-2">{user?.email}</td>
                    <td
                      className={`p-2 capitalize font-bold ${
                        user?.status === "active"
                          ? "text-accent-green"
                          : "text-accent-red"
                      }`}
                    >
                      {user?.status}
                    </td>
                    <td className="p-2">
                      <div className="flex justify-start items-center text-base gap-2">
                        <span
                          onClick={() => {
                            setSelectedData(user);
                            setIsModalOpen(true);
                          }}
                          className="cursor-pointer p-2 text-gray-100 bg-blue-500 rounded-full"
                        >
                          <Pencil size={16} />
                        </span>
                        <span
                          onClick={() => {
                            setSelectedData(user);
                            setIsStatusOpen(true);
                          }}
                          className="cursor-pointer p-2 text-gray-100 bg-purple-500 rounded-full"
                        >
                          <RefreshCcw size={16} />
                        </span>
                        <span
                          onClick={() => {
                            setSelectedData(user);
                            setIsDeleteOpen(true);
                          }}
                          className="cursor-pointer p-2 text-gray-100 bg-red-500 rounded-full"
                        >
                          <Trash size={16} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length} className="text-center p-4">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
        {/* pagination */}
        {!loading && users?.length > 0 && (
          <div className="w-full">
            <Pagination
              postsPerPage={PAGE_SIZE}
              totalPosts={Number(filters?.total)}
              currentPage={Number(filters?.currentPage)}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </div>
        )}
      </div>

      {/* create modal */}
      <>
        {!selectedData && (
          <UserForm
            type="add"
            isOpen={isModalOpen}
            onClose={closeFormDialog}
            setFlag={setUserFlag}
          />
        )}
      </>

      {/* edit modal */}
      <>
        {selectedData && (
          <UserForm
            data={selectedData}
            type="edit"
            isOpen={isModalOpen}
            onClose={closeFormDialog}
            setFlag={setUserFlag}
          />
        )}
      </>

      {/* delete modal */}
      <>
        {isDeleteOpen && (
          <Dialog
            isOpen={isDeleteOpen}
            onClose={closeDeleteDialog}
            onRequestClose={closeDeleteDialog}
            width={600}
          >
            <div className="mb-4 text-xl font-bold">Delete User</div>
            <p>Are you sure you want to delete this user?</p>

            <div className="flex justify-end items-center mt-4">
              <Button
                size="sm"
                variant="outlined"
                type="submit"
                onClick={closeDeleteDialog}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="contained"
                type="submit"
                onClick={onDelete}
              >
                Save
              </Button>
            </div>
          </Dialog>
        )}
      </>

      {/* status modal */}
      <>
        {isStatusOpen && (
          <Dialog
            isOpen={isStatusOpen}
            onClose={closeStatusDialog}
            onRequestClose={closeStatusDialog}
            width={600}
          >
            <div className="mb-4 text-xl font-bold">Change User Status</div>
            <p>
              Are you sure you want to{" "}
              {selectedData?.status === "active" ? "inactive" : "active"} this
              user?
            </p>

            <div className="flex justify-end items-center mt-4">
              <Button
                size="sm"
                variant="outlined"
                type="submit"
                onClick={closeStatusDialog}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="contained"
                type="submit"
                onClick={onChangeStatus}
              >
                Save
              </Button>
            </div>
          </Dialog>
        )}
      </>
    </>
  );
};

export default Users;
