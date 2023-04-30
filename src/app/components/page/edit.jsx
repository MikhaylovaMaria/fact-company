import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";
import BackHistoryButton from "../common/form/backButton";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useQualities } from "../../hooks/useQualities";
import { validator } from "../../utils/validator";

const Edit = () => {
    const {
        professions,
        getProfession,
        isLoading: isLoadingProfession
    } = useProfessions();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { currentUser, updateUser } = useAuth();
    const {
        qualities,
        getQuality,
        isLoading: IsLoadingQualities
    } = useQualities();
    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));
    const [data, setData] = useState({
        email: currentUser.email,
        profession: getProfession(currentUser.profession)?._id,
        sex: currentUser.sex,
        name: currentUser.name,
        qualities: currentUser.qualities.map((quality) => {
            return {
                label: getQuality(quality).name,
                value: getQuality(quality)._id,
                color: getQuality(quality).color
            };
        })
    });

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleChangeEdit = (e) => {
        e.preventDefault();
        updateUser({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        });
        history.push(`/users/${data._id}`);
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoadingProfession && !IsLoadingQualities ? (
                        <form onSubmit={handleChangeEdit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                onChange={handleChange}
                                options={professionsList}
                                value={data.profession}
                                label="Выберите вашу профессию"
                                name="profession"
                                error={errors.profession}
                            />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />

                            <MultiSelectField
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default Edit;
