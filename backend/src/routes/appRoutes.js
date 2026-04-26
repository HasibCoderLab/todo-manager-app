import {Router} from 'express';

const router = Router()

router.get('/', (req, res) => {
 res.send('app is running express')
})

export const appRoutes = router