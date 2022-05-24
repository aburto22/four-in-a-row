import dotenv from 'dotenv';
import server from './app';

dotenv.config();

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
