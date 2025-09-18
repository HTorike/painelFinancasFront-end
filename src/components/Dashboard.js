import { useState, useEffect } from "react";

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const respoonse = await fetch("https://painelfinancasback-end.onrender.com");
                if (!respoonse.ok) {
                    throw new Error("Erro na rede ou no servidor");
                }

                const result = await respoonse.json();
                setData (result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div>
            <h2>Visão Geral</h2>
            <p>Saldo atual: R$ {data.balance.toFixed(2)}</p>
            <p>Receita total: R$ {data.incomeTotal.toFixed(2)}</p>
            <p>Despesa total: R$ {data.expenseTotal.toFixed(2)}</p>

            <h3>Últimas transações</h3>
            <ul>
                {data.transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.description} - R$ {transaction.amount.toFixed(2)} ({transaction.type})
                    </li>
                ))}
            </ul>

        </div>
    );

}

export default Dashboard;