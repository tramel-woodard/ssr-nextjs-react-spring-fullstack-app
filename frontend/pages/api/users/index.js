import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export default async function handler(req, res) {
    switch(req.method) {
        case 'GET':
            try {
                const response = await axios.get(BASE_URL);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching users' });
            }
            break;
        case 'POST':
            try {
                const response = await axios.post(BASE_URL, req.body);
                res.status(201).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error creating user' });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const response = await axios.put(`${BASE_URL}/${id}`, req.body);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error updating user' });
            }
            break;
        case 'DELETE':
            try {
                const { id } = req.query;
                const response = await axios.delete(`${BASE_URL}/${id}`);
                res.status(200).json(response.data);
            } catch (error) {
                res.status(500).json({ error: 'Error deleting user' });
            }
            break;
        default:
            res.status(405).json({ error: 'Method not allowed' });
            break;
    }
}
