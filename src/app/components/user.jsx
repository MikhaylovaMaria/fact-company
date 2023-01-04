import React from "react";
import Qualities from "./qualitie";
import BookMark from "./bookmark";

const User = ({ ...user }) => {
    return (
        <>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => (
                    <Qualities {...item} key={item._id} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark status={user.bookmark} {...user} />
            </td>
        </>
    );
};

export default User;
