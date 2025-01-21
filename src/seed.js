const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listas de hábitos
const mindHabits = [
  'Medite por 10 minutos',
  'Leia um capítulo de um livro',
  'Pratique atenção plena durante 5 minutos',
  'Escreva seus pensamentos no papel',
  'Aprenda algo novo hoje',
];

const financialHabits = [
  'Revise seus gastos diários',
  'Economize 10% do seu salário',
  'Aprenda algo novo sobre investimentos',
  'Planeje suas metas financeiras da semana',
  'Evite gastos supérfluos hoje',
];

const soulHabits = [
  'Agradeça por 3 coisas boas do dia',
  'Passe 10 minutos na natureza',
  'Escreva um diário sobre seus sentimentos',
  'Reflita sobre algo que te fez feliz hoje',
  'Pratique um ato de bondade',
];

// Geração de todas as datas
const generateDates = () => {
  const dates = [];
  const start = new Date('2025-01-21'); // Começa no dia 21 de janeiro
  const end = new Date('2025-12-31');

  while (start <= end) {
    dates.push(new Date(start));
    start.setDate(start.getDate() + 1); // Incrementa 1 dia
  }
  return dates;
};

// Popular o banco de dados
const seedDatabase = async () => {
  const dates = generateDates();

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];

    // Seleciona um hábito de cada categoria
    const mind = mindHabits[i % mindHabits.length];
    const financial = financialHabits[i % financialHabits.length];
    const soul = soulHabits[i % soulHabits.length];

    // Cria o conteúdo do dia
    const content = `Mente: ${mind}, Financeiro: ${financial}, Alma: ${soul}`;

    // Insere no banco de dados
    await prisma.habit.create({
      data: {
        category: 'daily',
        content,
        date,
      },
    });
  }

  console.log('Database seeded successfully with unique daily habits!');
  await prisma.$disconnect();
};

seedDatabase().catch((error) => {
  console.error(error);
  prisma.$disconnect();
  process.exit(1);
});
