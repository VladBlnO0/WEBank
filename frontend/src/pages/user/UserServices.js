import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function PaymentPage() {
    const [selected, setSelected] = useState([]);

    const services = [
        { id: 1, name: "Electricity", icon: "bi bi-lightning", provider: "PowerCo", due: "May 7, 2025", amount: 7.07 },
        { id: 2, name: "Water", icon: "bi bi-droplet", provider: "PowerCo", due: "May 7, 2025", amount: 7.07 },
        { id: 3, name: "Gas", icon: "bi bi-fire", provider: "PowerCo", due: "May 7, 2025", amount: 7.07 },
    ];

    const toggleService = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const total = selected.reduce((sum, id) => {
        const item = services.find(s => s.id === id);
        return item ? sum + item.amount : sum;
    }, 0);

    return (
        <div className="min-vh-100 bg-light p-4 d-flex flex-column justify-content-between">
            <div className="d-flex rounded overflow-hidden shadow bg-white">
                <aside className="bg-white border-end" style={{ width: "250px" }}>
                    <div className="p-4 border-bottom d-flex align-items-center fw-semibold">
                        <i className="bi bi-bank2 me-2"></i> Bank
                    </div>
                    <nav className="d-flex flex-column p-2 gap-1">
                        <NavLink to="/wallet" className="btn btn-light text-start d-flex align-items-center">
                            <i className="bi bi-wallet2 me-2"></i> My Wallet
                        </NavLink>
                        <NavLink to="/transfers" className="btn btn-light text-start d-flex align-items-center">
                            <i className="bi bi-arrow-repeat me-2"></i> Transfers
                        </NavLink>
                        <NavLink to="/payments" className="btn btn-light text-start d-flex align-items-center active">
                            <i className="bi bi-calendar2-check me-2"></i> Payments
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-grow-1 p-4">
                    <div className="card mb-4 p-4">
                        <table className="table">
                            <thead>
                            <tr className="table-light">
                                <th><input type="checkbox" disabled /></th>
                                <th>Service</th>
                                <th>Provider</th>
                                <th>Due Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {services.map(service => (
                                <tr key={service.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(service.id)}
                                            onChange={() => toggleService(service.id)}
                                        />
                                    </td>
                                    <td>
                                        <i className={`${service.icon} me-2`}></i> {service.name}
                                    </td>
                                    <td>{service.provider}</td>
                                    <td>{service.due}</td>
                                    <td>${service.amount.toFixed(2)}</td>
                                    <td><span className="badge bg-secondary">Pending</span></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card p-4">
                        <h5 className="mb-3">Payment Summary</h5>
                        <p>Selected Services: {selected.length}</p>
                        <p>Total Amount: ${total.toFixed(2)}</p>
                        <button className="btn btn-dark w-100">
                            Proceed to Payment <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </main>
            </div>

            <footer className="text-center text-muted small mt-4">
                © 2025 Bank. All rights reserved.
            </footer>
        </div>
    );
}
