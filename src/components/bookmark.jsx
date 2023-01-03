import React from "react";

const BookMark = ({ status, ...rest }) => {
  return (
    <button
      className={"bi bi-suit-heart" + (status ? "-fill" : "")}
      onClick={() => rest.onToggle(rest._id)}
    ></button>
  );
};

export default BookMark;
