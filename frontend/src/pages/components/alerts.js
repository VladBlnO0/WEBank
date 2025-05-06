export const alerts = {
    passwordPolicy: {
        heading: 'Помилка',
        content: (
            <>
                <p>Пароль повинен містити наступне:</p>
                <ul>
                    <li>Буква і цифри</li>
                    <li>Нижній і верхній регістр</li>
                    <li>Мінімум 8 і максимум 20 символів</li>
                    <li>Спеціальні символи</li>
                </ul>
            </>
        ),
    },
    email: {
        heading: 'Помилка',
        content: <p>Пошта неправильна</p>,
    },
    phone: {
        heading: 'Помилка',
        content: <p>Телефон неправильний</p>,
    },
    userExists: {
        heading: 'Помилка',
        content: <p>Користувач вже існує</p>,
    },
    userNotExists: {
        heading: 'Помилка',
        content: <p>Користувач не існує</p>,
    },
    passwordWrong: {
        heading: 'Помилка',
        content: <p>Пароль неправильний</p>,
    },
}
