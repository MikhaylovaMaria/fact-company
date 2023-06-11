export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены неверно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        case "EMAIL_NOT_FOUND":
            return "Email или пароль введены неверно";
        default:
            return "Попробуй еще раз";
    }
}
