import React, { useState } from "react";

function TransactionForm({ onTransactionAdded }) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description || !amount) {
            alert("Por favor, preencha todos os campos.");
            return;
        };

        const transaction = {
            description,
            amount: parseFloat(amount),
            type,
        };

        try {
            const response = await fetch("https://painelfinancasback-end.onrender.com/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction),
            });
        
            if (!response.ok) {
                throw new Error("Erro ao adicionar transação");
            }

            setDescription("");
            setAmount("");
            setType("income");
            onTransactionAdded();

        } catch (error) {
        alert(error.message);
        };
    };

    return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={() => setType('income')}
              style={{ backgroundColor: type === 'income' ? 'green' : 'gray' }}
            >
              Entrada
            </button>
            <button
              type="button"
              onClick={() => setType('expense')}
              style={{ backgroundColor: type === 'expense' ? 'red' : 'gray' }}
            >
              Saída
            </button>
          </div>
          <button type="submit">Adicionar Transação</button>
        </form>
    );
}

export default TransactionForm;