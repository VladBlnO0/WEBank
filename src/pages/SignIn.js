import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Sign.module.css";

function SignIn() {
    const navigate = useNavigate();

    const goToUser = (e) => {
        e.preventDefault();
        navigate("/user");
    };

    const goToSignUp = (e) => {
        e.preventDefault();
        navigate("/sign-up");
    };

    return (
        <main className={styles.mainContainer}>
            <form onSubmit={goToUser} className={styles["form-signin"]}>
                <h1 className="h3 mb-3 font-weight-normal">Вхід</h1>
                <input type="text" id="username" className="form-control" placeholder="ID користувача" required autoFocus />
                <input type="password" id="password" className="form-control" placeholder="Пароль" required />
                <button className={styles.btn} type="submit">
                    Увійти
                </button>
            </form>

            <form onSubmit={goToSignUp} className={styles["form-signin"]}>
                <button className={styles.btn} type="submit">
                    Реєстрація
                </button>
            </form>
        </main>
    );
}

export default SignIn;
