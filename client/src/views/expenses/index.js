import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import Thead from "../../components/ui/table/thead";
import useToast from "../../hooks/useToast";
import { PAGE_SIZE } from "../../constants/app.constant";
import {
  deleteExpense,
  getAllConfig,
  getAllExpenses,
} from "../../services/expenseService";
import Pagination from "../../components/template/pagination";
import ExpenseForm from "./expenseForm";
import Dialog from "../../components/ui/dialog";
import { formatDateToDDMMMYYYY } from "../../utils/timeAndDateFormat";
import SelectField from "../../components/ui/select";
import Input from "../../components/ui/input";

const headers = ["Date", "User", "Category", "Amount", "Description", "Action"];

const Expenses = () => {
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseFlag, setExpenseFlag] = useState(false);
  const [filters, setFilters] = useState({
    currentPage: 1,
    total: 0,
    category: "",
    user: "",
    fromDate: "",
    toDate: "",
  });
  const [config, setConfig] = useState({
    users: [],
    categories: [],
  });

  const [selectedData, setSelectedData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setExpenseFlag(true);
  }, []);

  const getConfig = async () => {
    try {
      const resp = await getAllConfig();
      if (resp.success) {
        setConfig({
          users: resp?.data?.users || [],
          categories: resp?.data?.categories || [],
        });
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  useEffect(() => {
    getConfig();
  }, []);

  const getExpenses = useCallback(async () => {
    if (expenseFlag) {
      try {
        setLoading(true);
        const payload = {};
        if (filters?.category) {
          payload.category = filters?.category;
        }
        if (filters?.user) {
          payload.user = filters?.user;
        }
        if (filters?.fromDate) {
          payload.fromDate = filters?.fromDate;
        }
        if (filters?.toDate) {
          payload.toDate = filters?.toDate;
        }
        const resp = await getAllExpenses(
          payload,
          filters?.currentPage,
          PAGE_SIZE
        );
        if (resp?.success) {
          setExpenses(resp?.data);
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
        setExpenseFlag(false);
      }
    }
    // eslint-disable-next-line
  }, [expenseFlag]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const closeFormDialog = () => {
    setSelectedData();
    setIsModalOpen(false);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
  };

  const onDelete = async () => {
    try {
      const resp = await deleteExpense(selectedData?.id);

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
      setExpenseFlag(true);
      setIsDeleteOpen(false);
    }
  };

  const paginate = (pageNumber) => {
    setFilters({
      ...filters,
      currentPage: pageNumber,
    });
    setExpenseFlag(true);
  };

  const previousPage = () => {
    if (filters?.currentPage !== 1) {
      setFilters({
        ...filters,
        currentPage: filters?.currentPage - 1,
      });
    }
    setExpenseFlag(true);
  };

  const nextPage = () => {
    if (filters?.currentPage !== Math.ceil(filters?.total / PAGE_SIZE)) {
      setFilters({
        ...filters,
        currentPage: JSON.parse(filters?.currentPage) + 1,
      });
    }
    setExpenseFlag(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-primary-dark font-bold mb-4">Expenses</h2>
        <Button
          startIcon={<CirclePlus />}
          size="small"
          variant="contained"
          onClick={() => setIsModalOpen(true)}
        >
          Add Expense
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 my-4">
        <SelectField
          isClearable
          labelName="Filter by category"
          placeholder="Select Expense Category"
          options={config?.categories}
          onChange={(val) => {
            setFilters({
              ...filters,
              currentPage: 1,
              category: val?.value,
            });
            setExpenseFlag(true);
          }}
        />
        <SelectField
          isClearable
          labelName="Filter by user"
          placeholder="Select User"
          options={config?.users}
          onChange={(val) => {
            setFilters({
              ...filters,
              currentPage: 1,
              user: val?.value,
            });
            setExpenseFlag(true);
          }}
        />
        <Input
          type="date"
          label="From Date"
          placeholder="Select date"
          size="medium"
          autoComplete="off"
          onChange={(e) => {
            setFilters({
              ...filters,
              currentPage: 1,
              fromDate: e.target.value,
            });
            setExpenseFlag(true);
          }}
        />
        <Input
          type="date"
          label="To Date"
          placeholder="Select date"
          size="medium"
          autoComplete="off"
          onChange={(e) => {
            setFilters({
              ...filters,
              currentPage: 1,
              toDate: e.target.value,
            });
            setExpenseFlag(true);
          }}
        />
      </div>
      <div className="overflow-x-auto shadow-primary p-4 rounded-md">
        <table className="min-w-full bg-white ">
          {/* Table Head */}
          <Thead headers={headers} />

          {/* Table Body */}
          <tbody className="text-sm">
            {expenses?.length > 0 ? (
              expenses?.map((exp, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    expenses?.length === rowIndex + 1 ? "" : "border-b"
                  } hover:bg-gray-50 `}
                >
                  <td className="p-2">{formatDateToDDMMMYYYY(exp?.date)}</td>
                  <td className="p-2">{exp?.user_name}</td>
                  <td className="p-2">{exp?.category_name}</td>
                  <td className="p-2">{exp?.amount}</td>
                  <td className="p-2">{exp?.description}</td>
                  <td className="p-2">
                    <div className="flex justify-start items-center text-base gap-2">
                      <span
                        onClick={() => {
                          setSelectedData(exp);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer p-2 text-gray-100 bg-blue-500 rounded-full"
                      >
                        <Pencil size={16} />
                      </span>
                      <span
                        onClick={() => {
                          setSelectedData(exp);
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
        </table>
        {/* pagination */}
        {!loading && expenses?.length > 0 && (
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
          <ExpenseForm
            type="add"
            isOpen={isModalOpen}
            onClose={closeFormDialog}
            setFlag={setExpenseFlag}
          />
        )}
      </>

      {/* edit modal */}
      <>
        {selectedData && (
          <ExpenseForm
            data={selectedData}
            type="edit"
            isOpen={isModalOpen}
            onClose={closeFormDialog}
            setFlag={setExpenseFlag}
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
            <div className="mb-4 text-xl font-bold">Delete Expense</div>
            <p>Are you sure you want to this expense?</p>

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

export default Expenses;
