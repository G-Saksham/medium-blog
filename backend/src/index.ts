import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'

// base url version
const app = new Hono().basePath('/api/v1');

// routes
app.route('/user', user)

app.route('/blog', blog)

export default app