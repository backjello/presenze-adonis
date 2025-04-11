import { PresenceFactory } from '#database/factories/presence_factory';
import Presence from '#models/presence';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

export default class PresencesController {

    async index({ request }: HttpContext) {
        const page = request.input('page', 1)
        return await Presence.query().paginate(page, 25)
    }

    async show({ params }: HttpContext) {
        const id = params.id
        return await Presence.find(id)
    }

    async update({ params, request }: HttpContext) {
        const id = params.id
        const presenza = await Presence.findOrFail(id)
        const payload = request.all()

        presenza.merge(payload)

        await presenza.save()

        return presenza
    }


    async store({ request }: HttpContext) {
        const presenza = new Presence()
        const payload = request.all()


        payload.data = DateTime.fromISO(payload.data)
        console.log(payload);
        presenza.merge(payload)

        await presenza.save()

        await PresenceFactory.createMany(100)

        return presenza
    }

    async destroy({ params }: HttpContext) {
        const id = params.id
        const presenza = await Presence.findOrFail(id)
        await presenza.delete()
        return
    }

}