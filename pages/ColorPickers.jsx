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

import React, { useState } from 'react';

const colors = [
  { name: 'None', value: '' },
  { name: 'Nobel Grey', value: '#6D7278' },
  { name: 'Oxford Blue', value: '#2563EB' },
  { name: 'Electric Lilac', value: '#B19CD9' },
  { name: 'Purple', value: '#9333EA' },
  { name: 'Turquoise', value: '#00B5AD' },
  { name: 'Jungle Green', value: '#16A34A' },
  { name: 'Indian Red', value: '#DC2626' },
  { name: 'Tuscan Yellow', value: '#EAB308' },
  { name: 'Pink Flamingo', value: '#EC4899' },
  // { name: 'Teal Green', value: '#14B8A6' },
  // { name: 'Tangerine', value: '#F97316' },
  // { name: 'Royal Indigo', value: '#4F46E5' },
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
    style={{ backgroundColor: selectedColor || 'transparent' }}
  >
    <span className="">Background Color</span>
  </button>
  <button
    onClick={handleToggleDropdown}
    className="sm:hidden rounded-lg border-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
    style={{ backgroundColor: selectedColor || 'transparent' }}
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
            borderColor: isSelected ? 'black' : 'gray',
          };

          return (
            <div
              key={index}
              onClick={() => handleColorSelect(color.value)}
              className={`w-8 h-8 rounded-full cursor-pointer border transition-all duration-300 ease-in-out ${
                isSelected ? 'border-blue-800 shadow-lg shadow-blue-500' : 'border-gray-300'
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