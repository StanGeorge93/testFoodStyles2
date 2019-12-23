export default `
  type Query {
    Events
  }
  input addEventInput {
    name: String!,
    type: String!,
    frequency: String!,
  }
  type AddEventResponse {
    name: String,
    type: String,
    frequency: String,
  }
  type Mutation {
    addEvent(addEventInput: AddEventInput): AddEventResponse!
  }
`;