import ClipLoader from "react-spinners/ClipLoader";
const GlobalLoader = () => (
  <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-white">
    <ClipLoader
      size={60}
      color="#2563eb"
      loading={true}
      aria-label="loading-indicator"
    />
    <p className="text-lg font-semibold text-primary">Loading...</p>
  </div>
);

export default GlobalLoader;
