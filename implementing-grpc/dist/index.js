"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const packageDefinition = protoLoader.loadSync(path_1.default.join(__dirname, "../src/a.proto"));
const personProto = grpc.loadPackageDefinition(packageDefinition);
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
//@ts-ignore
function addPerson(call, callback) {
    console.log(call);
    let person = {
        name: call.request.name,
        age: call.request.age,
    };
    PERSONS.push(person);
    callback(null, person);
}
//@ts-ignore
function getPersonByName(call, callback) {
    const name = call.request.name;
    const person = PERSONS.find((x) => x.name === name);
    callback(null, person);
}
// const app = express();
const server = new grpc.Server();
// app.use("/person",routehandler);
server.addService(personProto.AddressBookService.service, { addPerson: addPerson, getPersonByName: getPersonByName });
// second one is the handler for the first addperson rpc..
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("server started");
});
