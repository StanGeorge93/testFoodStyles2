import express from "express";
import bodyParser from "body-parser"
import loggerFactory from "../utils/loggerFactory"
import graphqlHTTP from "express-graphql"
import cors from "cors"
import mongoose from "mongoose"
import CronJob from "../core/domain/cronJob"
import Agenda from "../agenda";
import { buildSchema } from "graphql";
import root from "../resolvers"
import cronJobSchema from "../schema"


const logger = loggerFactory("App")(console.log)

//test

// const schema = buildSchema(cronJobSchema);

const dummyCronJobs = [
  {
    name: "testEvt",
    type: "testType",
    frequency: "1 minute"
  },
  {
    name: "eventTest2",
    type: "crawlSmth",
    frequency: "10 seconds"
  }
];

const parseCronJobs = rawCronJobs => {
  return rawCronJobs.map(rawJob => new CronJob(rawJob))
}

class App {
  constructor() {
    logger("App initializing...")
    this.express = express()
    this.express.use(bodyParser.urlencoded({extended: false}))
    this.express.use(bodyParser.json())
    this.express.use(cors())

    // this.express.use('/graphql', graphqlHTTP({
    //   schema: schema,
    //   rootValue: root,
    //   graphiql: true,
    //   context: {
    //     cronJobSchema: cronJobSchema
    //   }
    // }));

    this.init()
  }

  async init() {
    await this._connectDB();
    await this._setupCronJobs();
  }

  async _connectDB() {
    try {
      await mongoose.connect("mongodb://mongo:27017/", {
        dbName: "foodStyles",
        useNewUrlParser: true
      })
      logger("Database connection successful")
    } catch (err) {
      console.log("ERR", err);
      console.error("Database connection error")
    }
  }

  async _setupCronJobs() {
    const cronJobs = parseCronJobs(dummyCronJobs);
    // define events
    cronJobs.forEach(event => {
      Agenda.define(event.name, {priority: 'high', concurrency: 10}, function (job, done) {
        const _event = job.attrs.data.res;

        const message = `name: ${_event.name},  type: ${_event.type}`;
        logger("EVENT MESSAGE: ", message)
      });
    });

    // save and run events
    cronJobs.forEach(async event => {
      const job = Agenda
        .create(event.name, {res: event})
        .unique({'data.name': event.name}, {insertOnly: true});

      await Agenda.start();
      await job.repeatEvery(event.frequency).save();
    })
  }
}

export default new App().express