/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthMiddleware from '#middleware/auth_middleware'
import Studente from '#models/studente'
import User from '#models/user'
import { stubsRoot } from '@adonisjs/bouncer'
import { StubsFactory } from '@adonisjs/core/factories/stubs'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { request } from 'http'
import { middleware } from './kernel.js'

router.group(() => {
  router.resource('studenti', '#controllers/studentes_controller')
  router.resource('presenze', '#controllers/presences_controller').apiOnly()
}).use(middleware.auth())


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

router.post('upload-file/:id', async ({ request, params }: HttpContext) => {

  const file = request.file('image', {
    extnames: ['jpg', 'jpeg', 'png'],
    size: '2mb'
  })

  if (!file?.isValid) {
    return "il file non è valido"
  }

  await file.move(app.makePath('tmp/uploads'), {
    name: `${cuid()}.${file.extname}`
  })

  const id = params.id

  const studente = await Studente.findOrFail(id)

  studente.profilePicture = file.fileName!

  await studente.save()

  return studente
})