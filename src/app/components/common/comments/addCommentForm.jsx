import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import SelectField from "../form/selectField";
import { validator } from "../../../utils/validator";
import TextAreaField from "../form/textAreaField";
const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const validatorConfig = {
        userId: { isRequired: { message: "Выберите имя пользователя" } },
        content: {
            isRequired: { message: "Комментарий не должен быть пустым" }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.prevent.default();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const arrayUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            value: users[userId]._id
        }));
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayUsers}
                    name="userId"
                    value={data.value}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Комментарий"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default AddCommentForm;
