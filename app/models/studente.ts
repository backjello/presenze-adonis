import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Corso from './corso.js'
import Presence from './presence.js'
import User from './user.js'

export default class Studente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare cognome: string

  @column()
  declare profilePicture: string

  @column.date()
  declare dataDiNascita: DateTime

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Presence)
  declare presenze: HasMany<typeof Presence>

  @manyToMany(() => Corso, {
    pivotTable: 'corsos_studentes',
    pivotColumns: ['data_di_iscrizione']
  })
  declare corsi: ManyToMany<typeof Corso>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}