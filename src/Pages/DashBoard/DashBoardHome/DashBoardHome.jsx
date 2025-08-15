import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import {
  FiUsers,
  FiActivity,
  FiBookOpen,
  FiMessageCircle,
} from "react-icons/fi";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/api/dashboard-stats");
      return res.data;
    },
  });

  const barData = [
    { name: "Users", count: stats.users || 0 },
    { name: "Trainers", count: stats.trainers || 0 },
    { name: "Classes", count: stats.classes || 0 },
    { name: "Forums", count: stats.forums || 0 },
  ];

  if (isLoading) {
    return <GlobalLoader></GlobalLoader>;
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <Helmet>
        <title>WeFit | DashBoard Home</title>
      </Helmet>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Users"
          value={stats.users}
          icon={<FiUsers className="text-blue-500" />}
        />
        <Card
          title="Total Trainers"
          value={stats.trainers}
          icon={<FiActivity className="text-green-500" />}
        />
        <Card
          title="Total Classes"
          value={stats.classes}
          icon={<FiBookOpen className="text-indigo-500" />}
        />
        <Card
          title="Total Forums"
          value={stats.forums}
          icon={<FiMessageCircle className="text-purple-500" />}
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          📊 Platform Stats Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Updated Card with icon and color enhancements
const Card = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-primary to-secondary shadow-md hover:scale-105 transition duration-300 rounded-xl p-5 flex items-center gap-4  cursor-pointer">
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-sm text-white">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value ?? 0}</h3>
    </div>
  </div>
);

export default DashboardHome;
