import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Button,
    IconButton,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const JsonTable = ({ title, data, open, onToggle }) => {
    if (!data || data.length === 0) {
        return null;
    }

    const headers = Object.keys(data[0]);

    const handleDownloadColumn = (header) => {
        const columnData = data.map(row => String(row[header])).join('\n');
        const blob = new Blob([columnData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace('.json', '')}_${header}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ width: '100%', backgroundColor: 'background.paper', mb: 2 }}>
            <Button
                variant="outlined"
                onClick={onToggle}
                sx={{
                    mb: 2,
                    width: '100%',
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    borderColor: 'divider',
                    '&:hover': {
                        backgroundColor: 'background.paper',
                    },
                }}
            >
                {open ? 'Скрыть' : 'Показать'} {title.replace('.json', '').replace(/_/g, ' ')}
            </Button>
            {open && (
                <>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {title.replace('.json', '').replace(/_/g, ' ')}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableCell
                                            key={header}
                                            sx={{
                                                fontWeight: 'bold',
                                                p: 0,
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', p: 2 }}>
                                                {header.charAt(0).toUpperCase() + header.slice(1)}
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDownloadColumn(header)}
                                                    sx={{ ml: 1 }}
                                                    aria-label={`Скачать столбец ${header}`}
                                                >
                                                    <DownloadIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        {headers.map((header) => (
                                            <TableCell key={header}>{String(row[header])}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default JsonTable;
