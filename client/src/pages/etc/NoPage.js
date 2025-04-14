import React from "react";

import styles from "../etc/NoPage.css";

class NoPage extends React.Component {
    render() {
        return (
            <main className={styles.mainContainer}>
                <h1>404</h1>
                <p>Page does not exist or you did something wrong</p>
                <div class="text">Loading...</div>
            </main>
        );
    }
}

export default NoPage;
