import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
import { cors } from 'hono/cors';

// base url version
const app = new Hono().basePath('/api/v1');

app.use('/*', cors())
// routes
app.route('/user', user)

app.route('/blog', blog)

export default app