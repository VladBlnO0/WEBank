import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import styles from "./Sign.module.css";

class SignUp extends React.Component {
    render() {
        return (
            <main className={styles.mainContainer}>
                <form method="get" className={styles["form-signin"]}>
                    <h1 className="h3 mb-3 font-weight-normal">Створення акаунта</h1>
                    <input type="text" id="username" className="form-control" placeholder="ID користувача" required autoFocus />
                    <input type="password" id="password" className="form-control" placeholder="Пароль" required />
                    <button className={styles.btn} type="submit">
                        Створити
                    </button>
                </form>
                <form onSubmit={this.handleSignIn} method="get" className={styles["form-signin"]}>
                    <button className={styles.btn} type="submit">
                        Вже є акаунт?
                    </button>
                </form>
            </main>
        );
    }
}

export default SignUp;
