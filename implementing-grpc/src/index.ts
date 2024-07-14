import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./generated/a";
import { AddressBookServiceHandlers } from "./generated/AddressBookService";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

const personProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const PERSONS = [
  {
    name: "harkirat",
    age: 45,
  },
  {
    name: "raman",
    age: 45,
  },
];

// call => req
// callback => res

const handler: AddressBookServiceHandlers = {
  AddPerson: function addPerson(call, callback) {
    console.log(call);
    let person = {
      name: call.request.name,
      age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person);
  },

  GetPersonByName: function getPersonByName(call, callback) {
    const name = call.request.name;
    const person = PERSONS.find((x) => x.name === name);
    callback(null, person);
  },
};

// const app = express();
const server = new grpc.Server();

// app.use("/person",routehandler);
server.addService(personProto.AddressBookService.service, handler);
// second one is the handler for the first addperson rpc..

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log("server started");
  }
);
