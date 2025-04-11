import Studente from '#models/studente'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import { PresenceFactory } from './presence_factory.js'

export const StudenteFactory = factory
  .define(Studente, async ({ faker }) => {
    return {
      nome: faker.person.firstName(),
      cognome: faker.person.lastName(),
      dataDiNascita: DateTime.fromJSDate(faker.date.birthdate()),
    }
  })
  .relation('presenze', () => PresenceFactory)
  .build()