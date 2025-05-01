import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({ sidebarOptions }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col shadow-md">
      <div
        className="p-4 text-lg font-bold border-b border-gray-200"
        style={{
          borderBottom: "3px solid #e60000",
        }}
      >
        Service Divisions
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {sidebarOptions.map((option, index) => (
            <li key={index}>
              <div
                className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-gray-900"
                onClick={() => toggleMenu(index)}
              >
                <span>{option.title}</span>
                {openMenu === index ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </div>
              {openMenu === index && (
                <ul className="mt-2 pl-4 space-y-4">
                  {option.subOptions.map((subOption, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={`/${subOption.stream
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        className="block text-gray-600 hover:text-gray-800 no-underline"
                      >
                        {subOption.stream}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
