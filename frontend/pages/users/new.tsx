import { useState } from 'react';
import { 
    Button,
    TextField,
    Container,
    Box,
    Typography,
    CircularProgress
} from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

const NewUserPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);
        setError('');

        try {
            await axios.post('/api/users', {name, email});
            router.push('/users');
        } catch (error) {
            setError('Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4">Create New User</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
                {error && (
                    <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
                        {error}
                    </Typography>
                )}
                <Box sx={{ marginTop: 2 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' + <CircularProgress size={24} /> : 'Create User'}
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default NewUserPage;