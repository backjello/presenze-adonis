import { editStudente } from '#abilities/main'
import Studente from '#models/studente'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class StudentesController {

    async show({ params }: HttpContext) {
        const id = params.id
        const student = await Studente.findOrFail(id)
        await student.load('user')
        await student.load('presenze')
        await student.load('corsi')
        console.log(student.corsi[0].$extras);

        return student
    }

    async index() {
        const students = await Studente.query()
            .preload('presenze', q =>
                q.where('presenza', true)
                // escludo tutte le assenze di uno studente
            )
            .preload('corsi')
            .preload('user')
        return students
    }

    async update({ params, request, bouncer, response, auth }: HttpContext) {
        const id = params.id

        const studente = await Studente.findOrFail(id)

        const payload = request.all()

        const canEdit = await bouncer.allows(editStudente, studente)

        console.log(auth.user?.serialize());

        if (!canEdit)
            return response.forbidden("you can't edit the studente")

        studente.merge(payload)

        await studente.save()

        return studente
    }


    async destroy({ params, bouncer }: HttpContext) {
        const id = params.id
        const studente = await Studente.findOrFail(id)

        if (await bouncer.with('StudentePolicy').denies('destroy', studente)) {
            return "non puoi elimare questo studente"
        }

        await studente.delete()

    }

}