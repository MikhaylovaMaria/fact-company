import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <button
            className={"bi bi-suit-heart" + (status ? "-fill" : "")}
            onClick={() => rest.onToggle(rest._id)}
        ></button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
