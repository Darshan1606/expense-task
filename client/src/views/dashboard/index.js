import React, { useCallback, useEffect, useState } from "react";
import {
  getNextMonthAmount,
  getPercentages,
  getTopDaysExpense,
} from "../../services/dashboardService";
import { getAllConfig } from "../../services/expenseService";
import SelectField from "../../components/ui/select";
import Thead from "../../components/ui/table/thead";
import { formatDateToDDMMMYYYY } from "../../utils/timeAndDateFormat";

const topDaysHeaders = ["Date", "Category", "Amount"];
const percentageChangeHeaders = [
  "User",
  "Current Month Total",
  "Previous Month Total",
  "Percentage Change",
];
const nextPredictionHeaders = ["User", "Next Month Amount"];

const Dashboard = () => {
  const [nextMonthPred, setNextMonthPred] = useState([]);
  const [percentageChange, setPercentageChange] = useState([]);
  const [topDays, setTopDays] = useState([]);
  const [topDaysFlag, setTopDaysFlag] = useState(false);
  const [topDaysFilters, setTopDaysFilters] = useState({
    user: "",
  });
  const [config, setConfig] = useState({
    users: [],
    categories: [],
  });

  useEffect(() => {
    setTopDaysFlag(true);
  }, []);

  const getExpenses = useCallback(async () => {
    if (topDaysFlag) {
      try {
        const resp = await getTopDaysExpense(topDaysFilters?.user);
        if (resp?.success) {
          setTopDays(resp?.data);
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setTopDaysFlag(false);
      }
    }
    // eslint-disable-next-line
  }, [topDaysFlag]);

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const getPercentageChange = useCallback(async () => {
    try {
      const resp = await getPercentages();
      if (resp?.success) {
        setPercentageChange(resp?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    getPercentageChange();
  }, [getPercentageChange]);

  const getNextMonthPredAmount = useCallback(async () => {
    try {
      const resp = await getNextMonthAmount();
      if (resp?.success) {
        setNextMonthPred(resp?.data);
      }
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    getNextMonthPredAmount();
  }, [getNextMonthPredAmount]);

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

  return (
    <div className="flex-1 p-2">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-primary">
          <h1 className="text-xl font-bold mb-2">Top 3 Expenditures By User</h1>
          <div className="mb-4">Select user to view top 3 expenses</div>

          <SelectField
            isClearable
            labelName="Filter by user"
            placeholder="Select User"
            options={config?.users}
            onChange={(val) => {
              setTopDaysFilters({
                ...topDaysFilters,
                user: val?.value,
              });
              setTopDaysFlag(true);
            }}
          />
          <div className="overflow-x-auto shadow-primary p-4 rounded-md my-4">
            <table className="min-w-full bg-white ">
              {/* Table Head */}
              <Thead headers={topDaysHeaders} />

              {/* Table Body */}
              <tbody className="text-sm">
                {topDays?.length > 0 ? (
                  topDays?.map((exp, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        topDays?.length === rowIndex + 1 ? "" : "border-b"
                      } hover:bg-gray-50 `}
                    >
                      <td className="p-2">
                        {formatDateToDDMMMYYYY(exp?.date)}
                      </td>
                      <td className="p-2">{exp?.category_name}</td>
                      <td className="p-2">{exp?.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={topDaysHeaders.length}
                      className="text-center p-4"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-primary">
          <h1 className="text-xl font-bold mb-8">
            Percentage Change (Current Month vs Previous Month)
          </h1>
          <div className="overflow-x-auto shadow-primary p-4 rounded-md my-4">
            <table className="min-w-full bg-white ">
              {/* Table Head */}
              <Thead headers={percentageChangeHeaders} />

              {/* Table Body */}
              <tbody className="text-sm">
                {percentageChange?.length > 0 ? (
                  percentageChange?.map((exp, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        percentageChange?.length === rowIndex + 1
                          ? ""
                          : "border-b"
                      } hover:bg-gray-50 `}
                    >
                      <td className="p-2">{exp?.user_name}</td>
                      <td className="p-2">{exp?.current_month_total}</td>
                      <td className="p-2">{exp?.previous_month_total}</td>
                      <td className="p-2">
                        {exp?.percentage_change
                          ? `${Math.ceil(exp?.percentage_change)}%`
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={percentageChangeHeaders.length}
                      className="text-center p-4"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-primary">
          <h1 className="text-xl font-bold mb-8">
            Next Month Projected Amount
          </h1>
          <div className="overflow-x-auto shadow-primary p-4 rounded-md my-4">
            <table className="min-w-full bg-white ">
              {/* Table Head */}
              <Thead headers={nextPredictionHeaders} />

              {/* Table Body */}
              <tbody className="text-sm">
                {nextMonthPred?.length > 0 ? (
                  nextMonthPred?.map((exp, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`${
                        nextMonthPred?.length === rowIndex + 1 ? "" : "border-b"
                      } hover:bg-gray-50 `}
                    >
                      <td className="p-2">{exp?.user_name}</td>
                      <td className="p-2">
                        {exp?.predicted_next_month_total
                          ? exp?.predicted_next_month_total
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={nextPredictionHeaders.length}
                      className="text-center p-4"
                    >
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
