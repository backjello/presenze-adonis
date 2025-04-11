import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'corsos_studentes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('studente_id').unsigned()
        .references('id')
        .inTable('studentes')
        .onDelete('CASCADE')

      table.integer('corso_id').unsigned()
        .references('id')
        .inTable('corsos')
        .onDelete('CASCADE')

      table.date('data_di_iscrizione').nullable()


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}