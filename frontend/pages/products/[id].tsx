import { useState, useEffect } from 'react';
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

const EditProductPage = () => {
    type Product = { id: number; name: string; price: number };

    const [product, setProduct] = useState<Product | null>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`/api/products/${id}`);
                    const { name, price } = response.data as Product;
                    setProduct(response.data as Product);
                    setName(name);
                    setPrice(price.toString());
                } catch (error) {
                    setError('Failed to fetch product');
                    setLoading(false);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/api/products/${id}`, { name, price: parseFloat(price) });
            router.push('/products');
        } catch (error) {
            setError('Failed to update product');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <CircularProgress />;

    return (
        <Container sx={{ marginTop: 2 }}>
            <Typography variant="h4" gutterBottom>
                Edit Product
            </Typography>

            {error && <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>{error}</Typography>}

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
                        {loading ? 'Updating...' + <CircularProgress size={24} /> : 'Update Product'}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default EditProductPage;
