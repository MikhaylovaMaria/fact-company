import React from "react";
import PropTypes from "prop-types";
import Qualities from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <Qualities {...item} key={item._id} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
