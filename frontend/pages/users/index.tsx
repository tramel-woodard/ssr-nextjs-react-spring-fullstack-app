import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
    Button, 
    CircularProgress,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box
} from '@mui/material';

const UsersPage = () => {
    type User = { id: number; name: string; email: string };

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data as User[]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, marginTop: 2 }}>
                <Typography variant="h4">Users</Typography>
                <Link href="/users/new" passHref>
                    <Button variant="contained" color="primary">
                        Create New User
                    </Button>
                </Link>
            </Box>
            <List>
                {users.map((user: User) => (
                    <ListItem key={user.id} sx={{ marginBottom: 1 }} divider>
                        <ListItemText primary={`${user.name} = ${user.email}`} />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Link href={`/users/${user.id}`} passHref>
                                <Button variant="outlined" color="secondary">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UsersPage;