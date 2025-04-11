import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'presences'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('nome')
      table.dropColumn('cognome')
      table.integer('studente_id').unsigned()
        .references('id').inTable('studentes')
        .onDelete('CASCADE')
        .after('presenza')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}