import React, { useState, useEffect } from "react";
import api from "../../api";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

const Edit = (userId) => {
    const [user, setUser] = useState();
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId.userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        if (target.name === "profession") {
            const filtProf = professions.filter(
                (profession) => profession.value === target.value
            )[0];
            setUser((prevState) => {
                return {
                    ...prevState,
                    [target.name]: { _id: filtProf.value, name: filtProf.label }
                };
            });
        } else if (target.name === "qualities") {
            setUser((prevState) => ({
                ...prevState,
                [target.name]: target.value.map((element) => {
                    return {
                        _id: element.value,
                        name: element.label,
                        color: element.color
                    };
                })
            }));
        } else {
            setUser((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    const handleChangeEdit = (e) => {
        e.preventDefault();
        api.users.update(userId.userId, user);
        history.push(`/users/${user._id}`);
    };

    if (user) {
        return (
            <form onSubmit={handleChangeEdit}>
                <TextField
                    label="Имя"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Почта"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <SelectField
                    onChange={handleChange}
                    options={professions}
                    value={user.profession._id}
                    label="Выберите вашу профессию"
                    name="profession"
                />
                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                    value={user.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите ваш пол"
                />
                <MultiSelectField
                    options={qualities}
                    onChange={handleChange}
                    name="qualities"
                    label="Выберите ваши качества"
                    defaultValue={user.qualities.map((quality) => {
                        return {
                            label: quality.name,
                            value: quality._id,
                            color: quality.color
                        };
                    })}
                />
                <button type="submit" className="btn btn-primary w-100 mx-auto">
                    Обновить
                </button>
            </form>
        );
    }
};

export default Edit;
