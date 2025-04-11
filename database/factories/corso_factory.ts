import factory from '@adonisjs/lucid/factories'
import Corso from '#models/corso'

export const CorsoFactory = factory
  .define(Corso, async ({ faker }) => {
    return {}
  })
  .build()