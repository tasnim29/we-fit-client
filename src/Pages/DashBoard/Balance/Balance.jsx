import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";

const COLORS = ["#0088FE", "#00C49F"];

const Balance = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: balanceData } = useQuery({
    queryKey: ["admin-balance"],
    queryFn: async () => (await axiosSecure.get("/admin/balance")).data,
  });

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await axiosSecure.get("/admin/stats")).data,
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <Helmet>
        <title>WeFit | Balance</title>
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 text-center ">
        Balance Overview
      </h1>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 sm:p-8 rounded-xl text-2xl sm:text-3xl font-semibold shadow mb-10 text-center">
        💰 Total Earnings: ${balanceData?.totalBalance || 0}
      </div>

      {/* Last 6 Transactions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Last 6 Transactions
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {balanceData?.recentTransactions?.map((tx, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-lg shadow-md border border-gray-100"
            >
              <p className="text-gray-700">
                <strong>User:</strong> {tx.userName}
              </p>
              <p className="text-gray-700 break-all">
                <strong>Email:</strong> {tx.userEmail}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> ${tx.amount}
              </p>
              <hr className="my-2" />
              <p className="text-gray-500 text-sm">
                <strong>Date:</strong> {new Date(tx.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm break-all">
                <strong>Transaction ID:</strong> {tx.transactionId}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
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
