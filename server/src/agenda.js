import Agenda from "agenda";
class AgendaProcess {
  constructor(address, collection ) {
    this.connectionOpts = {db: {address, collection}};
    this.agenda =  new Agenda(this.connectionOpts);

  }
}

export default new AgendaProcess("mongodb://mongo:27017/foodStyles", "agendaJobs").agenda