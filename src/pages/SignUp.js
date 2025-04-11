import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./css/Sign.module.css";

function SignUp() {
    const navigate = useNavigate();

    const goToUser = (e) => {
        e.preventDefault();
        navigate("/user", { state: { from: "/sign-in" } });
    };

    const goToSigIn = (e) => {
        e.preventDefault();
        navigate("/sign-in");
    };
    return (
        <main className={styles.mainContainer}>
            <form onSubmit={goToUser} method="get" className={styles["form-signin"]}>
                <h1 className="h3 mb-3 font-weight-normal">Створення акаунта</h1>
                <input type="text" id="username" className="form-control" placeholder="ID користувача" required autoFocus />
                <input type="password" id="password" className="form-control" placeholder="Пароль" required />
                <button className={styles.btn} type="submit">
                    Створити
                </button>
            </form>
            <form onSubmit={goToSigIn} method="get" className={styles["form-signin"]}>
                <button className={styles.btn} type="submit">
                    Вже є акаунт?
                </button>
            </form>
        </main>
    );
}

export default SignUp;
