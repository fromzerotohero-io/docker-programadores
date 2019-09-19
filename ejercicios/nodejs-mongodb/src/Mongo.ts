import {Db, MongoClient, ObjectID} from 'mongodb'

const DB = 'fromzerotohero'

class Mongo
{
    private mongoClient!: MongoClient
    private db!: Db

    public ready: Promise<any>

    constructor() {
        this.ready = MongoClient.connect('mongodb://mongodb')
            .then((client: any) => {
                this.mongoClient = client
                this.db = this.mongoClient.db(DB)
            })
            .catch((error: any) => {
                return new Error(`Error in initial Mongo connection: ${error.message}`)
            })
    }

    public client() {
        return this.mongoClient
    }

    public insert(document: Record<string, any>): Promise<any> {
        return this.db.collection('count').insertOne(document)
    }

    public count () {
        return this.db.collection('count').count()
    }
}

export default Mongo
