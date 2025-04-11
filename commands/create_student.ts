import { StudenteFactory } from '#database/factories/studente_factory'
import { args, BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class CreateStudent extends BaseCommand {
  static commandName = 'create:student'
  static description = 'Questo commando crea uno studente nuovo'

  static options: CommandOptions = {
    startApp: true
  }

  @args.string({
    required: false,
    description: 'indica il numero di studenti che voglio creare',
    default: '1'
  })
  declare numeroStudenti: string

  @flags.boolean({
    alias: 'c',
    description: 'indica il numero di presenze da creare con lo studente'
  })
  declare creaConPresenze: boolean

  async run() {

    const numberoStudentiInt = parseInt(this.numeroStudenti)

    if (this.creaConPresenze) {
      const studenti = await StudenteFactory
        .with('presenze', 3)
        .createMany(numberoStudentiInt)

      console.log(studenti);
    }
    else {
      const studenti = await StudenteFactory
        .createMany(numberoStudentiInt)

      console.log(studenti);
    }

  }
}