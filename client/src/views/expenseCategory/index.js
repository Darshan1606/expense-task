import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import CategoryForm from "./categoryForm";
import {
  deleteCategory,
  getAllCategories,
} from "../../services/expenseCategoryService";
import Thead from "../../components/ui/table/thead";
import Dialog from "../../components/ui/dialog";
import { PAGE_SIZE } from "../../constants/app.constant";
import useToast from "../../hooks/useToast";

const headers = ["Name", "Action"];

const ExpenseCategory = () => {
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [filters, setFilters] = useState({
    currentPage: 1,
    total: 0,
    search: "",
  });
  const [selectedData, setSelectedData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setCategoryFlag(true);
  }, []);

  const getCategories = useCallback(async () => {
    if (categoryFlag) {
      try {
        setLoading(true);
        const payload = {};
        if (filters?.search?.length > 2) {
          payload.search = filters?.search;
        }
        const resp = await getAllCategories(
          payload,
          filters?.currentPage,
          PAGE_SIZE
        );
        if (resp?.success) {
          setCategories(resp?.data);
          setFilters({
            ...filters,
            currentPage: resp?.pagination?.currentPage,
            total: resp?.pagination?.total,
          });
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false);
        setCategoryFlag(false);
      }
    }
    // eslint-disable-next-line
  }, [categoryFlag]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const closeFormDialog = () => {
    setSelectedData();
    setIsModalOpen(false);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  const onDelete = async () => {
    let resp;
    try {
      resp = await deleteCategory(selectedData?.id);

      if (resp?.success) {
        successToast(resp?.message);
      }
    } catch (err) {
      console.log("err", err);
      errorToast(resp?.message || resp?.error?.message);
    } finally {
      setCategoryFlag(true);
      setIsDeleteOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-primary-dark font-bold mb-4">
          Expense Category
        </h2>
        <Button
          startIcon={<CirclePlus />}
          size="small"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Add Expense Category
        </Button>
      </div>

      <div className="overflow-x-auto shadow-primary p-4 rounded-md">
        <table className="min-w-full bg-white">
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
              {categories?.length > 0 ? (
                categories?.map((category, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      categories?.length === rowIndex + 1 ? "" : "border-b"
                    } hover:bg-gray-50 `}
                  >
                    <td className="p-2">{category?.name}</td>
                    <td className="p-2">
                      <div className="flex justify-start items-center text-base gap-2">
                        <span
                          onClick={() => {
                            setSelectedData(category);
                            setIsModalOpen(true);
                          }}
                          className="cursor-pointer p-2 text-gray-100 bg-blue-500 rounded-full"
                        >
                          <Pencil size={16} />
                        </span>
                        <span
                          onClick={() => {
                            setSelectedData(category);
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
      </div>

      {/* create modal */}
      <>
        {!selectedData && (
          <CategoryForm
            type="add"
            isOpen={isModalOpen}
            onClose={closeFormDialog}
            setFlag={setCategoryFlag}
          />
        )}
      </>

      {/* edit modal */}
      <>
        {selectedData && (
          <CategoryForm
            data={selectedData}
            type="edit"
            isOpen={isModalOpen}
            onClose={closeFormDialog}
            setFlag={setCategoryFlag}
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
            <div className="mb-4 text-xl font-bold">
              Delete Expense Category
            </div>
            <p>Are you sure you want to delete this expense category?</p>

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
    </>
  );
};

export default ExpenseCategory;
