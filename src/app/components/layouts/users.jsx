import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../pagination";
import PropTypes from "prop-types";
import GroupList from "../groupList";
import api from "../../api";
import SearchStatus from "../searchStatus";
import UserTable from "../usersTable";
import _ from "lodash";
import QualitiesList from "../qualitiesList";
import { useHistory } from "react-router-dom";

const Users = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "esc" });
    const [user, setUser] = useState();
    const history = useHistory();
    console.log(history);

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

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (
        users > 0 &&
        history.location.pathname !== "login" &&
        history.location.pathname !== "main"
    ) {
        const userId = match.params.userId;
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession._id === selectedProf._id)
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        const goToList = () => {
            history.push("/users");
        };

        if (userId) {
            api.users.default.getById(userId).then((data) => setUser(data));
            if (user) {
                return (
                    <>
                        <h1>{user.name}</h1>;
                        <h2>Профессия: {user.profession.name}</h2>
                        <QualitiesList qualities={user.qualities} />
                        <h3>Количество встреч: {user.completedMeetings}</h3>
                        <h3>Оценка: {user.rate}</h3>
                        <button onClick={goToList}>Назад</button>
                    </>
                );
            }
        } else {
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
    }

    return "loading..";
};
Users.propTypes = {
    match: PropTypes.object,
    users: PropTypes.array,
    onToggleBookMark: PropTypes.func
};

export default Users;
