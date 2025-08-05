import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
    Button,
    TextField,
    Box,
    Typography,
    CircularProgress,
    Container
} from '@mui/material';

const EditUserPage = () => {
    type User = { id: number; name: string; email: string };

    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`/api/users/${id}`);
                    const { name, email } = response.data as User;
                    setUser(response.data as User);
                    setName(name);
                    setEmail(email);
                } catch (error) {
                    setError('Failed to fetch user');
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await axios.put(`/api/users/${id}`, { name, email});
            router.push('/users');
        } catch (error) {
            setError('Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress sx={{ marginTop: 3 }} />;

    if (!user) return <Typography variant="h6">Loading...</Typography>;

    return (
        <Container sx={{ marginTop: 2 }}>
            <Typography variant="h4" gutterBottom>
                Edit User
            </Typography>

            {error && <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>{error}</Typography>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                />
                <Box sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Updating...' + <CircularProgress size={24} color="inherit" /> : 'Update User'}
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

export default EditUserPage;
