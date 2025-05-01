import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({ sidebarOptions }) => {
  const [openMenu, setOpenMenu] = useState(null); // Track open service division
  const [openStream, setOpenStream] = useState(null); // Track open stream

  // Toggle service division menu open/close
  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  // Toggle stream sub-options open/close
  const toggleStream = (index) => {
    setOpenStream(openStream === index ? null : index);
  };

  return (
    <aside className="w-64 bg-white text-gray-800 flex flex-col shadow-md">
      <div className="p-4 text-lg font-bold border-b border-gray-200">
        Service Divisions
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {sidebarOptions.map((option, index) => (
            <li key={index}>
              {/* Service Division */}
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
                      {/* Stream */}
                      <div
                        className="flex justify-between items-center cursor-pointer text-gray-600 hover:text-gray-800"
                        onClick={() => toggleStream(`${index}-${subIndex}`)}
                      >
                        <span>{subOption.stream}</span>
                        {openStream === `${index}-${subIndex}` ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                      {openStream === `${index}-${subIndex}` && (
                        <ul className="mt-1 pl-4 space-y-2">
                          {subOption.staticSubOptions.map(
                            (staticOption, staticIndex) => (
                              <li key={staticIndex}>
                                <a
                                  href="#"
                                  className="block text-gray-600 hover:text-gray-800"
                                >
                                  {staticOption}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <a href="#" className="block text-gray-600 hover:text-gray-800">
          Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
