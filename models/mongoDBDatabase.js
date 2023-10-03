const { MongoClient } = require('mongodb');
const Database = require('./database');

class MongoDBDatabase extends Database {
    constructor(connectionString) {
        super();
        const client = new MongoClient(connectionString);
        this.database = client.db();
    }

    async save(object) {
        const { insertedId } = await this.database.collection('images').insertOne(object);
        return insertedId;
    }

    async findById(id) {
        const object = await this.database.collection('images').findOne({ id: id });
        return object;
    }

    async findAll() {
        const objects = await this.database.collection('images').findMany();
        return objects;
    }
}

module.exports = MongoDBDatabase;