import { useState } from "react";

const FloatingSearch = ({ selectedCategories, toggleCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-4 left-4">
      <div className="relative">
        <button onClick={toggleDropdown} className="btn m-1">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
            ></path>
          </svg>
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-2 bg-base-100 rounded-box z-10 w-52 p-2 shadow">
            {Object.keys(selectedCategories).map((category) => (
              <li key={category}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories[category]}
                    onChange={() => toggleCategory(category)}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FloatingSearch;