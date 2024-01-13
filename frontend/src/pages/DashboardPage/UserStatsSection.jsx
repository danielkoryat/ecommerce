const UserStatsSection = ({ products }) => (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
      <div className="flex flex-col md:flex-row justify-between">
        {/* Replace with actual data as needed */}
        <div className="mb-4 md:mb-0">
          <span className="block text-lg font-bold">Total Products:</span>
          <span className="block text-xl">{products.length}</span>
        </div>
        {/* Add more stats here */}
      </div>
    </div>
  );

export default UserStatsSection