import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

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
        <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 2, mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>

            <Typography variant="h6" gutterBottom justifyContent={"center"} align="center">
              Adicionar Nova Transação
            </Typography>

            <Grid container spacing={2} justifyContent={"center"} alignItems="center">

                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Descrição"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Valor"
                      variant="outlined"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                </Grid>
              
                <Grid container spacing={0}>
                  <Box sx={{ display: 'flex', gap: 2 }}>

                    <Button
                      variant={type === "income" ? "contained" : "outlined"}
                      onClick={() => setType("income")}
                      color="success">
                      Entrada
                    </Button>
                    <Button
                      variant={type === "expense" ? "contained" : "outlined"}
                      onClick={() => setType("expense")}
                      color="error">
                      Saída
                    </Button>

                  </Box>
                </Grid>

                <Grid item xs={12}>

                    <Button 
                    fullWidth
                    type="submit"
                    variant="contained">
                      Adicionar Transação
                    </Button>
                  
                </Grid>

            </Grid>

        </Box>
    );
}

export default TransactionForm;