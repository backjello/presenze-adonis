/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthMiddleware from '#middleware/auth_middleware'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(() => {
  router.resource('presenze', '#controllers/presences_controller').apiOnly()
}).use(middleware.auth())

router.resource('studenti', '#controllers/studentes_controller')

router.post('login', async ({ request }: HttpContext) => {
  const email = request.input('email')
  const password = request.input('password')

  const user = await User.verifyCredentials(email, password)

  const token = await User.accessTokens.create(user)

  await user.load('studente')

  return { user, token }

})

router.post('register', async ({ request }: HttpContext) => {
  const { email, password, fullName } = request.all()
  const user = await User.create({
    email,
    fullName,
    password
  })
  return user
})