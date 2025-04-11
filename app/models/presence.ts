import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Studente from './studente.js'

export default class Presence extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare presenza: boolean

  @column.date()
  declare data: DateTime

  @column()
  declare studenteId: number

  @belongsTo(() => Studente)
  declare studente: BelongsTo<typeof Studente>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}