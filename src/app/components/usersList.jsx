import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import TextField from "./textField";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "esc" });
    const pageSize = 8;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.default.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(newUsers);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchUser]);

    const handleProfessionSelect = (item) => {
        setSearchUser("");
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const searchedUsers = searchUser
            ? filteredUsers.filter((user) => user.name.includes(searchUser))
            : filteredUsers;

        const count = searchedUsers.length;
        const sortedUsers = _.orderBy(
            searchedUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        const handleSearchPeople = ({ target }) => {
            setSearchUser(target.value);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <TextField
                        name="search"
                        placeholder={"Search..."}
                        value={searchUser}
                        onChange={handleSearchPeople}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading..";
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
