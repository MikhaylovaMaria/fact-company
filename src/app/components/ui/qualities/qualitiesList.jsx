import React from "react";
import PropTypes from "prop-types";
import Qualities from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { getQuality } = useQualities();
    return qualities.map((item) => {
        const temp = getQuality(item);
        return <Qualities {...temp} key={temp._id} />;
    });
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
