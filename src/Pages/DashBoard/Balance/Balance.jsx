import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

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
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Balance Overview</h1>

      {/* Total Balance */}
      <div className="bg-white p-6 rounded-lg shadow text-xl font-semibold mb-8">
        💰 Total Earnings: ${balanceData?.totalBalance || 0}
      </div>

      {/* Last 6 Transactions */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Last 6 Transactions</h2>
        <ul className="space-y-3">
          {balanceData?.recentTransactions?.map((tx, idx) => (
            <li
              key={idx}
              className="bg-gray-50 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>User:</strong> {tx.userName}
                </p>
                <p>
                  <strong>Email:</strong> {tx.userEmail}
                </p>
                <p>
                  <strong>Amount:</strong> ${tx.amount}
                </p>
              </div>
              <div>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(tx.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Transaction ID:</strong> {tx.transactionId}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chart Section */}
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Newsletter vs Paid Members
        </h2>
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
  );
};

export default Balance;
