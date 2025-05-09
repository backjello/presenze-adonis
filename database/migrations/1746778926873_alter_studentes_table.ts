import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'studentes'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('profile_picture').defaultTo('')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}