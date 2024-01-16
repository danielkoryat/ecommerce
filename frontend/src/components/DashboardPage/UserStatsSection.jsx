import { useSelector } from "react-redux";

const UserStatsSection = ({ products }) => {
  const watchlist = useSelector((state) => state.watchlist.items);

  const sumProductWorth = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });
    return total;
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
      <div className="flex flex-col md:flex-row justify-between">
        <Stat title="Total Products" value={products.length} />
        <Stat
          title="Total Products Worth"
          value={sumProductWorth(products) + "$"}
        />
        <Stat title="Items In Watchlist" value={watchlist.length} />
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="mb-4 md:mb-0">
    <span className="block text-lg font-bold">{title}</span>
    <span className="block text-xl">{value}</span>
  </div>
);

export default UserStatsSection;
