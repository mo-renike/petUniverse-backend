import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to PetUniverse Connect API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
