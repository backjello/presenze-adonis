import Studente from '#models/studente'
import User from '#models/user'
import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class StudentePolicy extends BasePolicy {

    update(user: User, studente: Studente) {
        return user.id == studente.userId
    }

    destroy(user: User, studente: Studente) {
        if (user.id == studente.userId)
            return true

        return AuthorizationResponse.deny("questo studente non esiste", 404)
    }

}