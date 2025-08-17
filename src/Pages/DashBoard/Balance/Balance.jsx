import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const COLORS = ["#0088FE", "#00C49F"];

const Balance = () => {
  const axiosSecure = UseAxiosSecure();
  const { theme } = use(AuthContext);
  const { data: balanceData } = useQuery({
    queryKey: ["admin-balance"],
    queryFn: async () => (await axiosSecure.get("/admin/balance")).data,
  });

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await axiosSecure.get("/admin/stats")).data,
  });

  return (
    <div className={`max-w-7xl mx-auto py-10 px-4`}>
      <Helmet>
        <title>WeFit | Balance</title>
      </Helmet>

      <h1
        className={`text-2xl sm:text-3xl font-bold mb-10 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Balance Overview
      </h1>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sm:p-8 rounded-xl text-2xl sm:text-3xl font-semibold shadow mb-10 text-center">
        💰 Total Earnings: ${balanceData?.totalBalance || 0}
      </div>

      {/* Last 6 Transactions */}
      <div className="mb-12">
        <h2
          className={`text-2xl font-semibold mb-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Last 6 Transactions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {balanceData?.recentTransactions?.map((tx, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-lg shadow-md border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-100 text-gray-700"
              }`}
            >
              <p>
                <strong>User:</strong> {tx.userName}
              </p>
              <p className="break-all">
                <strong>Email:</strong> {tx.userEmail}
              </p>
              <p>
                <strong>Amount:</strong> ${tx.amount}
              </p>
              <hr className="my-2 border-gray-400" />
              <p className="text-sm">
                <strong>Date:</strong> {new Date(tx.date).toLocaleDateString()}
              </p>
              <p className="text-sm break-all">
                <strong>Transaction ID:</strong> {tx.transactionId}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="max-w-xl mx-auto">
        <h2
          className={`text-2xl font-semibold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Newsletter vs Paid Members
        </h2>
        <div className="w-full overflow-x-auto">
          <PieChart width={400} height={300}>
            <Pie
              data={[
                { name: "Subscribers", value: stats?.totalSubscribers || 0 },
                { name: "Paid Members", value: stats?.paidMembers || 0 },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {COLORS.map((color, idx) => (
                <Cell key={`cell-${idx}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Balance;
