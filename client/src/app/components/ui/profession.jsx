import React from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionsByIds,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionsByIds(id));

    if (isLoading) return "Loading...";

    return <p>{prof[0].name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
