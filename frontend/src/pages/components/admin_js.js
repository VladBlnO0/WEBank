import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://backend:4000';

export default function TransactionsChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/stats`) // or your actual stats URL
            .then(res => res.json())
            .then((data) => {
                // fallback if you don't have transactions yet
                const labels = ['Total Users'];
                const values = [data.totalUsers || 0];

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Total Users',
                            data: values,
                            backgroundColor: ['rgba(75,192,192,0.5)'],
                            borderColor: ['rgba(75,192,192,1)'],
                            borderWidth: 1,
                        },
                    ],
                });
            });
    }, []);

    if (!chartData) return <p>Loading chart...</p>;

    return <Bar data={chartData} options={{ responsive: true }} />;
}
