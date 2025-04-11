import Studente from '#models/studente'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentesController {

    async show({ params }: HttpContext) {
        const id = params.id
        const student = await Studente.findOrFail(id)
        await student.load('user')
        await student.load('presenze')
        return student
    }

    async index() {
        const students = await Studente.query()
            .preload('presenze', q =>
                q.where('presenza', true)
                // escludo tutte le assenze di uno studente
            )
        return students
    }

}