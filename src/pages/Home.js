import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Home.module.css";
import './components/footer.css';

class Home extends React.Component {
    render() {
        return (
            <main className={styles.mainContainer}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.h1}>
                        Ласкаво просимо до <span className={styles.highlight}>WEBank</span>-у
                    </h1>
                    <p className={styles.subtext}>
                        Обслуговування клієнтів <strong>24/7</strong>
                    </p>
                    <div className={styles.buttons}>
                        <NavLink to="about" className={styles.btn}>
                            Про WEBank
                        </NavLink>
                        <NavLink to="sign-in" className={styles.btn}>
                            Увійти
                        </NavLink>
                    </div>
                </div>
                <footer>&copy; 2025 WEBank. Всі права захищені.</footer>
            </main>
        );
    }
}

export default Home;
