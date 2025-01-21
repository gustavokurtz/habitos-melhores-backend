const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Rota para retornar hábitos do dia
app.get('/habits/today', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const habits = await prisma.habit.findMany({
    where: { date: new Date(today) },
  });
  res.json(habits);
});

app.delete('/habits/reset', async (req, res) => {
    await prisma.habit.deleteMany({});
    res.send({ message: 'All habits have been deleted' });
  });
  

// Inicializar servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
