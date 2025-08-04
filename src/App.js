import React, { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import JsonTable from './JsonTable';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const jsonFiles = [
    'czech_stores_matrasy.json',
    'delana_stores.json',
    'litovski1.json',
    'matrasy1.json',
    'matratex_stores.json',
    'mattsonsbeds_partners.json',
    'polish_stores.json',
    'slovakia_stores_clean.json'
];

function App() {
    const [allData, setAllData] = useState([]);
    const [openTables, setOpenTables] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const dataPromises = jsonFiles.map(file =>
                fetch(`${process.env.PUBLIC_URL}/results/${file}`)
                    .then(response => response.json())
                    .then(data => ({ fileName: file, data }))
                    .catch(error => console.error(`Ошибка загрузки ${file}:`, error))
            );
            const loadedData = await Promise.all(dataPromises);
            setAllData(loadedData.filter(Boolean));
        };

        fetchData();
    }, []);

    const handleToggleTable = (fileName) => {
        setOpenTables(prev => ({
            ...prev,
            [fileName]: !prev[fileName]
        }));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mt: 4, mb: 4 }}>
                    Данные из JSON файлов
                </Typography>
                {allData.map(({ fileName, data }) => (
                    <JsonTable
                        key={fileName}
                        title={fileName}
                        data={data}
                        open={!!openTables[fileName]}
                        onToggle={() => handleToggleTable(fileName)}
                    />
                ))}
            </Container>
        </ThemeProvider>
    );
}

export default App;
