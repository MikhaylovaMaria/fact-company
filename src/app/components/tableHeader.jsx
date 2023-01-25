import React from "react";
import PropTypes from "prop-types";

let activeColumn = null;

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        activeColumn = item;
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        style={{ textAlign: "center" }}
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path === activeColumn && (
                            <div
                                className={
                                    "bi bi-chevron-compact" +
                                    (selectedSort.order === "asc"
                                        ? "-up"
                                        : "-down")
                                }
                            ></div>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
