import beverages from "./../../assets/img/cat/baverages-1.jpg.png";
import meat from "./../../assets/img/cat/meat-1.jpg.png";
import biscuitssnacks from "./../../assets/img/cat/biscuitssnacks-1.jpg.png";
import breadbakery from "./../../assets/img/cat/breadbakery-1.jpg.png";
import dairy from "./../../assets/img/cat/dairy-1.jpg.png";
import fruitvegetables from "./../../assets/img/cat/fruitvegetables-1.jpg.png";
import household from "./../../assets/img/cat/household-1.jpg.png";
import FrozenFood from "./../../assets/img/cat/FrozenFood.png";
import Grocery from "./../../assets/img/cat/Grocery.png";

const CategoriesSection = () => {
  const fixedCategory = {
    name: "Beverages",
    items: "11 Items",
    image: beverages,
    bgColor: "bg-yellow-100",
  };

  const categories = [
    {
      id: 2,
      name: "Biscuits & Snacks",
      items: "5 Items",
      image: biscuitssnacks,
    },
    {
      id: 3,
      name: "Breads & Bakery",
      items: "5 Items",
      image: breadbakery,
    },
    {
      id: 4,
      name: "Breakfast & Dairy",
      items: "8 Items",
      image: dairy,
    },
    {
      id: 5,
      name: "Frozen Foods",
      items: "7 Items",
      image: FrozenFood,
    },
    {
      id: 6,
      name: "Fruits & Vegetables",
      items: "11 Items",
      image: fruitvegetables,
    },
    {
      id: 7,
      name: "Grocery & Staples",
      items: "8 Items",
      image: Grocery,
    },
    {
      id: 8,
      name: "Household Needs",
      items: "1 Item",
      image: household,
    },
    {
      id: 9,
      name: "Meats & Seafood",
      items: "5 Items",
      image: meat,
    },
  ];

  return (
    <div className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row  ">
          <div className=" md:w-auto md:flex-[0_0_240px]  my-auto">
            <div className="bg-white text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-300 rounded-lg p-4 h-full">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={fixedCategory?.image}
                  alt={fixedCategory?.name}
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {fixedCategory?.name}
              </h3>
              <p className="text-sm text-gray-500">{fixedCategory?.items}</p>
            </div>
          </div>

          <div className="flex-1 border border-[#EDEEF5] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 hover:shadow-lg transition-shadow cursor-pointer ">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 sm:p-3 bg-white hover:shadow-lg  transition-shadow border border-gray-200 "
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden mb-3">
                    <img
                      className="w-full h-full object-cover"
                      src={category?.image}
                      alt={category?.name}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base text-center mb-1">
                    {category?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    {category?.items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
