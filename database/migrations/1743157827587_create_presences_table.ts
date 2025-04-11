import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'presences'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome')
      table.string('cognome')
      table.date('data')
      table.boolean('presenza')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}