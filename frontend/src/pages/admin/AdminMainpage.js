import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Navigate } from "react-router-dom";
import styles from "../css/Admin.module.css";
import { Editor } from '@tinymce/tinymce-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export function AdminMainpage() {
    const location = useLocation();
    const allowedFrom = ["/admin/admin-mainpage", "/admin/admin-users", "/sign-in", "/sign-up", "/admin"];
    const cameFrom = location.state?.from;
    const [intro, setIntro] = useState('');
    const [services, setServices] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/content/about`)
            .then(res => res.json())
            .then(data => {
                setIntro(data.intro);
                setServices(data.services);
                setContact(data.contact);
            });
    }, []);

    function updateSection(key, value) {
        fetch(`${API_BASE_URL}/api/content/about/${key}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: value })
        });
    }

    if (!allowedFrom.includes(cameFrom)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>@DMIN</div>
                <nav className={styles.nav}>
                    <NavLink to="/admin" className={styles["nav-item"]} state={{ from: "/admin/admin-mainpage" }}>
                        Адміністративна панель
                    </NavLink>
                    <NavLink to="/admin-users" className={styles["nav-item"]} state={{ from: "/admin/admin-mainpage" }}>
                        Користувачі
                    </NavLink>
                    <NavLink to="/admin-mainpage" className={styles["nav-item"]} state={{ from: "/admin/admin-mainpage" }}>
                        Контент
                    </NavLink>
                </nav>
                <NavLink to="/" className={styles["nav-item"]}>
                    Вийти
                </NavLink>
            </aside>
            <main className={styles["main-content"]}>
                <section className={styles.content}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Секція</th>
                                <th>Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <Editor
                                        apiKey="3cgdds5n90wh9p4ete23o5npe29ni2yw0k4c4xqhvy99v10z"
                                        value={intro}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: 'link lists',
                                            toolbar:
                                                'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link',
                                        }}
                                        onEditorChange={(newValue) => setIntro(newValue)}
                                    />
                                </td>
                                    <td>
                                    <div className={styles.buttons}>
                                        <button className={styles.btn} type="button" onClick={() => updateSection('intro', intro)}>Зберегти</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Editor
                                        apiKey="3cgdds5n90wh9p4ete23o5npe29ni2yw0k4c4xqhvy99v10z"
                                        value={services}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: 'link lists',
                                            toolbar:
                                                'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link',
                                        }}
                                        onEditorChange={(newValue) => setServices(newValue)}
                                    />
                                </td>
                                <td>
                                    <div className={styles.buttons}>
                                        <button className={styles.btn} type="button" onClick={() => updateSection('services', services)}>Зберегти</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Editor
                                        apiKey="3cgdds5n90wh9p4ete23o5npe29ni2yw0k4c4xqhvy99v10z"
                                        value={contact}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: 'link lists',
                                            toolbar:
                                                'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link',
                                        }}
                                        onEditorChange={(newValue) => setContact(newValue)}
                                    />
                                </td>
                                <td>
                                    <div className={styles.buttons}>
                                        <button className={styles.btn} type="button" onClick={() => updateSection('contact', contact)}>Зберегти</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default AdminMainpage;
