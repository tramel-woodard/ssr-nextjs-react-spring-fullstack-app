import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import {
    Container,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress
} from '@mui/material';

const ProductsPage = () => {
    type Product = { id: number; name: string; price: number; };

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data as Product[]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(prev => prev.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Container>
            <Box sx={{ marginTop: 3, marginBottom: 2 }}>
                <Link href="/products/new" passHref>
                    <Button variant="contained" color="primary">
                        Create New Product
                    </Button>
                </Link>
            </Box>

            <List>
                {products.map((product) => (
                    <ListItem key={product.id} divider>
                        <ListItemText
                            primary={product.name}
                            secondary={`$${product.price}`}
                        />
                        <Box>
                            <Link href={`/products/${product.id}`} passHref>
                                <Button variant="outlined" color="secondary" sx={{ marginRight: 1 }}>
                                    Edit
                                </Button>
                            </Link>
                            <Button 
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(product.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default ProductsPage;
