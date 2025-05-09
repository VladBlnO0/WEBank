import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './css/About.module.css'
import './etc/footer.css'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intro: '',
            services: '',
            contact: ''
        };
    }

    componentDidMount() {
        fetch(`${API_BASE_URL}/api/content/about`)
            .then(res => res.json())
            .then(data => this.setState({
                intro: data.intro,
                services: data.services,
                contact: data.contact
            }));
    }

    render() {
        return (
            <main className={styles.mainContainer}>
                <div className={styles.contentContainer}>
                    <h1>Про WEBank</h1>
                    <p>Ваш фінансовий партнер для безпечного майбутнього</p>
                    <section id="about">
                        <h2>Про нас</h2>
                        <div dangerouslySetInnerHTML={{ __html: this.state.intro }} />
                    </section>
                    <p>Наші послуги:</p>
                    <section id="services">
                        <div dangerouslySetInnerHTML={{ __html: this.state.services }} />
                    </section>
                    <section id="contact">
                        <h2>Зв'язок з нами</h2>
                        <div dangerouslySetInnerHTML={{ __html: this.state.contact }} />
                    </section>
                    <NavLink to="/" className={styles.btn}>
                        Повернутися на головну сторінку
                    </NavLink>
                </div>
                <footer>&copy; 2025 WEBank. Всі права захищені.</footer>
            </main>
        )
    }
}

export default About
