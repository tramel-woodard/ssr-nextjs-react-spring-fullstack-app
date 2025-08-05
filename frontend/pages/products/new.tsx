import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
    Container,
    Box,
    TextField,
    Button,
    CircularProgress,
    Typography
} from '@mui/material';

const NewProductPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/products', { name, price: parseFloat(price) });
            router.push('/products');
        } catch (error) {
            setError('Failed to create product');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create New Product
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Product Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Product Price"
                    fullWidth
                    margin="normal"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    type="number"
                />

                <Box sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? 'Creating...' + <CircularProgress size={24} /> : 'Create Product'}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default NewProductPage;
