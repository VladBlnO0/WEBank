import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./css/About.module.css";
import "./etc/footer.css";

class About extends React.Component {
    render() {
        return (
            <main className={styles.mainContainer}>
                <div className={styles.contentContainer}>
                    <h1 className={styles.h1}>Про WEBank</h1>
                    <p className={styles.p}>Ваш фінансовий партнер для безпечного майбутнього</p>
                    <section id="about">
                        <h2 className={styles.h2}>Про нас</h2>
                        <p className={styles.p}>Ми прагнемо допомогти вам досягти ваших фінансових цілей.</p>
                    </section>
                    <p className={styles.p}>Наші послуги:</p>
                    <section id="services">
                        <ul className={styles.ul}>
                            <li>Перегляд свого рахунку</li>
                            <li>Переказ коштів на картку</li>
                            <li>Оплата послуг</li>
                        </ul>
                    </section>
                    <section id="contact">
                        <h2 className={styles.h2}>Зв'язок з нами</h2>
                        <p className={styles.p}>Пошта: gmail@WEBank.com</p>
                        <p className={styles.p}>Телефон: +(839) 447-2387</p>
                    </section>
                    <NavLink to="/" className={styles.btn}>
                        Повернутися на головну сторінку
                    </NavLink>
                </div>
                <footer>&copy; 2025 WEBank. Всі права захищені.</footer>
            </main>
        );
    }
}

export default About;
