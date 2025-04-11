import Presence from '#models/presence'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import { StudenteFactory } from './studente_factory.js'

export const PresenceFactory = factory
  .define(Presence, async ({ faker }) => {
    return {
      data: DateTime.fromJSDate(faker.date.soon()),
      presenza: Math.random() > 0.33
    }
  })
  .relation('studente', () => StudenteFactory)
  .build()