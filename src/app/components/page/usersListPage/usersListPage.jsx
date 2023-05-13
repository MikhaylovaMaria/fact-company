import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchUser, setSearchUser] = useState("");
    const [sortBy, setSortBy] = useState({ iter: "name", order: "esc" });
    const pageSize = 8;
    const { users } = useUser();
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus);
    const { currentUser } = useAuth();

    const handleDelete = (userId) => {
        //    setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };
    const handToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        // setUsers(newUsers);
        console.log(newUsers);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchUser]);

    const handleProfessionSelect = (item) => {
        if (searchUser !== "") setSearchUser("");
        setSelectedProf(item);
    };

    const handleSearchPeople = ({ target }) => {
        setSelectedProf(undefined);
        setSearchUser(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    function filterUsers(data) {
        const filteredUsers = searchUser
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchUser.toLowerCase()) !== -1
              )
            : selectedProf
            ? data.filter((user) => user.profession._id === selectedProf._id)
            : data;
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    if (users) {
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && professionsLoading && (
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
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder={"Search..."}
                        onChange={handleSearchPeople}
                        value={searchUser}
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
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
