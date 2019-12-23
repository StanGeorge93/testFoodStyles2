export default class CronJob {
  constructor(config) {
    this.id = config.id
    this.name = config.name
    this.type = config.type
    this.frequency = config.frequency
  }
}