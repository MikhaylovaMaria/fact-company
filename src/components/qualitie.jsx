import React from "react";

const Qualities = ({ color, name, id }) => {
  return (
    <span className={`badge bg-${color} m-2`} key={id}>
      {name}
    </span>
  );
};

export default Qualities;
