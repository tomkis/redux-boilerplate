import express from 'express';
const app = express();

// put your DATABASE_URI etc. into config files
import config from './config';

app.use('/', express.static('dist/client'));
app.get('/hello', (req, res) => res.json({
  hello: config.HELLO_MESSAGE
}));

app.listen(process.env.PORT || 3000);
