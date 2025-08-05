import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const response = await axios.get(`${BASE_URL}/${id}`);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching user' });
            }
            break;
        case 'PUT':
            try {
                const response = await axios.put(`${BASE_URL}/${id}`, req.body);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error updating user' });
            }
            break;
        case 'DELETE':
            try {
                const response = await axios.delete(`${BASE_URL}/${id}`);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error deleting user' });
            }
            break;
        default:
            res.status(500).json({ error: 'Method not allowed' });
            break;
    }
}
