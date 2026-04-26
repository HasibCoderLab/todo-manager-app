import {app} from './src/app.js';
import {connectDB} from './src/config/db.js';

const port = process.env.PORT || 3000

connectDB().then(() => app.listen(port, () => {
  console.log(`server is running on ${port}`)
})).catch(error => {
  console.error('failed server', error)
})

