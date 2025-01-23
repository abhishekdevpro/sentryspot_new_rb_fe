// import React, { useState } from 'react';

// const colors = [
//   { name: 'None', value: '' },
//   { name: 'Nobel Grey', value: '#8e8e8e' },
//   { name: 'Oxford Blue', value: '#002147' },
//   { name: 'Electric Lilac', value: '#b19cd9' },
//   { name: 'Olympic Blue', value: '#0094c6' },
//   { name: 'Turquoise', value: '#00b5ad' },
//   { name: 'Jungle Green', value: '#029e73' },
//   { name: 'Indian Red', value: '#cd5c5c' },
//   { name: 'Tuscan Yellow', value: '#f7c52b' },
// ];

// const ColorPicker = ({ selectedColor, onChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleColorSelect = (color) => {
//     onChange(color);
//     setIsOpen(false); // Close the dropdown after selection
//   };

//   return (
//     <div className="relative flex items-center m-2 ">
//       <button
//         onClick={handleToggleDropdown}
//         className="rounded-lg border-2 border-white px-6 py-2 font-bold  bg-white text-white"
//         style={{ backgroundColor: selectedColor || "transparent" }}
//       >
//         Theme
//       </button>
//       {isOpen && (
//         <div className="absolute top-10 mt-2  bg-white border rounded-3xl shadow-lg z-50">
//           <div className="flex  p-5 space-x-4 bg-white rounded-3xl">
//             {colors.map((color, index) => {
//               const isSelected = selectedColor === color.value;
//               const hoverStyle = {
//                 backgroundColor: color.value,
//                 borderColor: isSelected ? "black" : "gray",
//               };

//               return (
//                 <div
//                   key={index}
//                   onClick={() => handleColorSelect(color.value)}
//                   className={`w-6 h-6 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
//                     isSelected
//                       ? "border-blue-80 shadow-lg shadow-blue-500"
//                       : "border-gray-300"
//                   } hover:border-black`}
//                   style={hoverStyle}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ColorPicker;

import React, { useState } from "react";

const colors = [
  { name: "None", value: "" },

  { name: "Electric Lilac", value: "#B19CD9" },

  {
    name: "Gray",
    class: "bg-gray-200",
    selectedClass: "ring-gray-400",
    value: "#6D7278",
  },
  {
    name: "Blue",
    class: "bg-blue-600",
    selectedClass: "ring-blue-400",
    value: "#2563EB",
  },
  {
    name: "Purple",
    class: "bg-purple-600",
    selectedClass: "ring-purple-400",
    value: "#9333EA",
  },
  {
    name: "Green",
    class: "bg-green-600",
    selectedClass: "ring-green-400",
    value: "#16A34A",
  },
  {
    name: "Red",
    class: "bg-red-600",
    selectedClass: "ring-red-400",
    value: "#DC2626",
  },
  {
    name: "Yellow",
    class: "bg-yellow-500",
    selectedClass: "ring-yellow-400",
    value: "#EAB308",
  },
  {
    name: "Pink",
    class: "bg-pink-500",
    selectedClass: "ring-pink-400",
    value: "#EC4899",
  },
  {
    name: "Teal",
    class: "bg-teal-500",
    selectedClass: "ring-teal-400",
    value: "#14B8A6",
  },
  {
    name: "Orange",
    class: "bg-orange-500",
    selectedClass: "ring-orange-400",
    value: "#F97316",
  },
  {
    name: "Indigo",
    class: "bg-indigo-600",
    selectedClass: "ring-indigo-400",
    value: "#4F46E5",
  },
];

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleColorSelect = (color) => {
    onChange(color);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    // <div className="relative flex items-center m-2 z-20 ">
    //   <button
    //     onClick={handleToggleDropdown}

    //     className="hidden sm:block rounded-lg border-2 border-blue-800 px-8 p-1 font-bold  bg-white text-blue-800"
    //     style={{ backgroundColor: selectedColor || 'transparent' }}
    //   >
    // <span className="">Background Color</span>

    //   </button>
    //   <button
    //     onClick={handleToggleDropdown}
    //     className="sm:hidden rounded-lg border-2 border-blue-800 px-5 py-2 font-bold  bg-white text-blue-800"
    //     style={{ backgroundColor: selectedColor || 'transparent' }}
    //   >
    //  Color
    //   </button>
    //   {isOpen && (
    //     <div className="absolute top-10 mt-2  bg-white border rounded-3xl shadow-lg z-50">
    //       <div className="flex  p-5 space-x-4 bg-white rounded-3xl">
    //         {colors.map((color, index) => {
    //           const isSelected = selectedColor === color.value;
    //           const hoverStyle = {
    //             backgroundColor: color.value,
    //             borderColor: isSelected ? 'black' : 'gray',
    //           };

    //           return (
    //             <div
    //               key={index}
    //               onClick={() => handleColorSelect(color.value)}
    //               className={`w-6 h-6 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
    //                 isSelected ? 'border-blue-80 shadow-lg shadow-blue-500' : 'border-gray-300'
    //               } hover:border-black`}
    //               style={hoverStyle}
    //             />
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="relative flex items-center m-2 z-20">
      <button
        onClick={handleToggleDropdown}
        className="hidden sm:block rounded-lg border-2 border-blue-800 px-8 p-1 font-bold bg-white text-blue-800"
        style={{ backgroundColor: selectedColor || "transparent" }}
      >
        <span className="">Background Color</span>
      </button>
      <button
        onClick={handleToggleDropdown}
        className="sm:hidden rounded-lg border-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
        style={{ backgroundColor: selectedColor || "transparent" }}
      >
        Color
      </button>
      {isOpen && (
        <div className="absolute top-10 mt-2 bg-white border rounded-3xl shadow-lg z-50">
          <div className="grid grid-cols-5 gap-4 p-5 bg-white rounded-3xl">
            {colors.map((color, index) => {
              const isSelected = selectedColor === color.value;
              const hoverStyle = {
                backgroundColor: color.value,
                borderColor: isSelected ? "black" : "gray",
              };

              return (
                <div
                  key={index}
                  onClick={() => handleColorSelect(color.value)}
                  className={`w-8 h-8 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
                    isSelected
                      ? "border-blue-800 shadow-lg shadow-blue-500"
                      : "border-gray-300"
                  } hover:border-black`}
                  style={hoverStyle}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
