import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from "@mui/material/Divider";
import React from "react";
import IncomeExpenseChart from "./IncomeExpenseChart";


function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("https://painelfinancasback-end.onrender.com/transactions/dashboard");
                if (!response.ok) {
                    throw new Error("Erro na rede ou no servidor");
                }

                const result = await response.json();
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
        return <Typography variant="h6">Carregando...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Erro: {error}</Typography>;
    }

    if (!data) {
        return <Typography variant="h6">Não foi possível carregar os dados.</Typography>;
    }

    return (

        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2} justifyContent={"center"} alignItems="center">
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component={"div"}>
                                Saldo atual
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                R$ {data.balance.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component={"div"}>
                                Receitas totais
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                R$ {data.incomeTotal.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component={"div"}>
                                Despesas totais
                            </Typography>
                            <Typography variant="h4" color="text.secondary">
                                R$ {data.expenseTotal.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <Box mt={4} display={"flex"} justifyContent={"center"} alignItems="center">
                <IncomeExpenseChart incomeTotal={data.incomeTotal} expenseTotal={data.expenseTotal} />
            </Box>

            <Box mt={4}>
                <Grid container spacing={2} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems="center">
                    <Typography variant="h6">
                        Últimas Transações
                    </Typography>
                    <List justifyContent={"center"} alignItems="center">
                        {data.transactions.map((transaction, index) => (
                            <React.Fragment key={transaction._id}>
                                <ListItem>
                                    <ListItemText
                                        primary={transaction.description}
                                        secondary={`R$ ${transaction.amount.toFixed(2)} - ${new Date(transaction.date).toLocaleDateString()}`}
                                    />
                                </ListItem>
                                {index < data.transactions.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Grid>

            </Box>
        </Box>

    );

}

export default Dashboard;