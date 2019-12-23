import { model, Schema } from "mongoose"

const CronJobSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true
  }
});

export default model("cronJob", CronJobSchema)
