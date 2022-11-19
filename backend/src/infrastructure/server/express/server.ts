import App from './app';
import 'dotenv/config';

const app = new App();
const port = process.env.PORT || 3001;

app.start(port);
