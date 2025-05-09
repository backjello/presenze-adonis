/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Studente from '#models/studente'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'
export const editStudente = Bouncer.ability((user: User, studente: Studente) => {
  return user.id == studente.userId //|| user.isAdmin
})