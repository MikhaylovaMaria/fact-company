export function displayDate(data) {
    const dateComment = new Date(data);
    const dateNow = new Date();
    const year = dateNow.getFullYear() - dateComment.getFullYear();
    if (year === 0) {
        const day = dateNow.getDay() - dateComment.getDay();
        if (day === 0) {
            const hours = dateNow.getHours() - dateComment.getDay();
            if (hours === 0) {
                const minutes = dateNow.getMinutes() - dateComment.getMinutes();

                if (minutes >= 0 && minutes < 5) return "1 минуту назад";
                if (minutes >= 5 && minutes < 10) return "5 минут назад";
                if (minutes >= 10 && minutes < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }

            return `${dateComment.getHours()}:${dateComment.getMinutes()}`;
        }
        return `${dateComment.getDay()} ${dateComment.toLocaleString(
            "default",
            {
                month: "long"
            }
        )}`;
    }
    return (
        dateComment.getDay() +
        "." +
        (dateComment.getMonth() + 1) +
        "." +
        dateComment.getFullYear()
    );
}
