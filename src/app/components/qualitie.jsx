import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ color, name }) => {
    return <span className={`badge bg-${color} m-2`}>{name}</span>;
};
Qualities.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualities;
