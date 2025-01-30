import React from "react";

const Thead = ({ headers }) => {
  return (
    <thead>
      <tr className="bg-gray-200">
        {headers.map((header, index) => (
          <th key={index} className="p-2 text-left font-bold">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
