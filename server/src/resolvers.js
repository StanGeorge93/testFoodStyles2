import loggerFactory from "./utils/loggerFactory"

const logger = loggerFactory("Resolvers")(console.log)

const Root = {
  addEvent: async ({registerInput: {name, type, frequency}}, {repository}) => {
    // register: async (...args) => {
    // Validate user data
    console.log("ASDF", name);

    try {
      // change from dummy data in app.js to actual adding here
    } catch (error) {
      // handle error
    }

  },
};

export default Root
