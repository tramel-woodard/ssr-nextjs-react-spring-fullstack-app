import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from '@mui/material';

export default function Navbar() {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SSR React App
                </Typography>
                <Box>
                    <Button color="inherit" component="a" href="/">Home</Button>
                    <Button color="inherit" component="a" href="/users">Users</Button>
                    <Button color="inherit" component="a" href="/products">Products</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
