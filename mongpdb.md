## Beginner Level

### 1. What is MongoDB?
MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents called BSON instead of rows and tables. Unlike relational databases, it doesn't require a fixed schema, so different documents in the same collection can have different fields. It is widely used for applications that need horizontal scalability, fast iteration, and semi-structured or rapidly evolving data models.

```js
db.users.insertOne({ name: "John Doe", age: 28, email: "john@example.com" });
```

### 2. What is the difference between SQL and MongoDB?
SQL databases are relational, storing data in tables with rows and columns and enforcing a fixed schema, while MongoDB is a NoSQL database that stores data as flexible documents inside collections. SQL relies on JOINs to combine related data, whereas MongoDB typically favors embedding related data directly within a document or using references. MongoDB is generally easier to scale horizontally, while SQL databases have traditionally been stronger for complex transactional and relational integrity guarantees.

```js
// SQL: SELECT * FROM users WHERE age > 25;
db.users.find({ age: { $gt: 25 } });
```

### 3. What is a document in MongoDB?
A document is the basic unit of data in MongoDB, stored in a binary form of JSON called BSON, which supports additional data types like dates and binary data. Each document is made up of field-value pairs, similar to a row in a relational table, but with a flexible and nested structure. Documents within the same collection are not required to share the same fields or structure.

```js
{
  _id: ObjectId("64f1a2b3c4d5e6f7a8b9c0d1"),
  name: "Alice",
  address: { city: "Delhi", zip: "110001" }
}
```

### 4. What is a collection in MongoDB?
A collection is a group of MongoDB documents, roughly equivalent to a table in a relational database, but without enforcing a strict schema. All documents within a collection are typically similar in purpose, such as storing all user records or all order records. Collections are created automatically the first time you insert a document into them, unless explicitly created beforehand.

```js
db.createCollection("employees");
db.employees.insertOne({ name: "Sam", role: "Developer" });
```

### 5. What is the _id field in MongoDB?
The _id field is a special field that acts as the primary key for every document in a MongoDB collection, and it is automatically indexed. If you don't provide a value for _id when inserting a document, MongoDB automatically generates a unique ObjectId for it. The ObjectId itself encodes information like a timestamp, making it possible to infer the approximate creation time of a document.

```js
db.orders.insertOne({ item: "Laptop", qty: 1 });
// Automatically generates something like _id: ObjectId("64f1a2...")
```

### 6. What are the different data types supported in MongoDB?
MongoDB supports a rich set of BSON data types including String, Integer, Boolean, Double, Array, Object, Null, Date, ObjectId, and Binary Data. This flexibility allows documents to store complex nested structures like arrays of sub-documents within a single field. Understanding these types is important for correctly querying and indexing data, especially when working with dates or numeric comparisons.

```js
{
  name: "Product A",
  price: 29.99,
  inStock: true,
  tags: ["electronics", "sale"],
  createdAt: new Date()
}
```

### 7. How do you insert documents in MongoDB?
MongoDB provides insertOne to add a single document and insertMany to add multiple documents at once, both operations being simple and fast. If a document doesn't specify an _id field, MongoDB will generate one automatically before storing it. Insert operations are atomic at the single-document level, meaning a document is either fully saved or not saved at all.

```js
db.products.insertMany([
  { name: "Pen", price: 1.5 },
  { name: "Notebook", price: 3.0 }
]);
```

### 8. How do you query documents in MongoDB?
The find() method is used to query documents in a collection, and it accepts a query filter object as its first argument to narrow down results. Calling find() without any arguments returns all documents in the collection, while findOne() returns just a single matching document. Query filters can use comparison operators, logical operators, and even nested field matching for more advanced conditions.

```js
db.employees.find({ department: "Engineering" });
db.employees.findOne({ email: "john@example.com" });
```

### 9. How do you update documents in MongoDB?
MongoDB provides updateOne, updateMany, and replaceOne methods to modify existing documents, typically combined with update operators like $set, $inc, or $unset. updateOne modifies the first matching document, while updateMany applies the change to all documents matching the filter. Using update operators is important because directly assigning a new object would replace the entire document rather than modifying specific fields.

```js
db.employees.updateOne(
  { name: "John Doe" },
  { $set: { department: "Sales" } }
);
```

### 10. How do you delete documents in MongoDB?
MongoDB provides deleteOne and deleteMany methods to remove documents matching a specified filter, both of which permanently remove data. deleteOne removes only the first document that matches the filter, while deleteMany removes every matching document in the collection. Care must be taken with an empty filter object in deleteMany, since it would delete every document in the collection.

```js
db.employees.deleteOne({ name: "John Doe" });
db.employees.deleteMany({ status: "inactive" });
```

---

## Intermediate Level

### 11. What is the difference between embedding and referencing in MongoDB?
Embedding stores related data directly within a single document, which is efficient for data that is frequently accessed together and doesn't change often. Referencing stores a related document's _id in another document and requires a separate query, or a $lookup, to join the data, similar to a foreign key in SQL. The right choice depends on your read and write patterns, how large the embedded data could grow, and whether the related data is shared across multiple parent documents.

```js
// Embedding
{ name: "Order1", items: [{ product: "Pen", qty: 2 }] }

// Referencing
{ name: "Order1", customerId: ObjectId("64f1a2b3c4d5e6f7a8b9c0d1") }
```

### 12. What is aggregation in MongoDB?
Aggregation is a framework used to process and transform data through a sequence of stages, similar to a pipeline, to compute summarized or reshaped results. Each stage, like $match, $group, or $sort, takes the documents from the previous stage as input and passes its output to the next. It is commonly used for tasks like calculating totals, grouping data by category, or reshaping documents for reporting purposes.

```js
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
]);
```

### 13. What is the difference between $match and $group in the aggregation pipeline?
$match filters documents early in the pipeline, similar to a WHERE clause in SQL, and it's most efficient when placed as early as possible so it can use indexes. $group then groups the filtered documents by a specified key and applies accumulator expressions like $sum, $avg, or $max to compute aggregated values. Using $match before $group significantly improves performance since it reduces the number of documents that need to be processed and grouped.

```js
db.sales.aggregate([
  { $match: { year: 2024 } },
  { $group: { _id: "$product", totalSales: { $sum: "$amount" } } }
]);
```

### 14. What is indexing in MongoDB and why is it important?
An index in MongoDB is a special data structure that stores a small portion of the collection's data in an easy-to-traverse form, dramatically speeding up query performance. Without an appropriate index, MongoDB has to perform a collection scan, checking every document to find matches. Indexes come at the cost of additional storage and slightly slower write performance, since every insert or update must also update the relevant indexes.

```js
db.users.createIndex({ email: 1 });
db.users.find({ email: "john@example.com" }); // uses the index
```

### 15. What are the different types of indexes in MongoDB?
MongoDB supports several index types including single field, compound, multikey (for array fields), text (for full-text search), geospatial, and hashed indexes. Compound indexes are built on multiple fields and follow a similar leftmost-prefix rule as SQL composite indexes. Text indexes enable efficient searching within string content, which would otherwise require slow regex-based queries.

```js
db.products.createIndex({ category: 1, price: -1 }); // compound index
db.articles.createIndex({ content: "text" });          // text index
```

### 16. What is the aggregation stage $lookup used for?
$lookup performs a left outer join between two collections, allowing you to combine documents from a "from" collection into your pipeline based on a matching field. It's the closest MongoDB equivalent to a SQL JOIN and is often used when related data is stored in separate collections rather than embedded. Because $lookup can be expensive on large collections, it's important to ensure the joined field is indexed on the foreign collection.

```js
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo"
    }
  }
]);
```

### 17. What is schema validation in MongoDB?
Even though MongoDB is schema-less by default, it supports optional schema validation using JSON Schema rules applied at the collection level. This allows you to enforce required fields, specific data types, or value constraints while still retaining the flexibility to evolve the schema over time. It's commonly used in production systems to prevent malformed data from being inserted without giving up all the flexibility NoSQL offers.

```js
db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        email: { bsonType: "string", pattern: "^.+@.+$" }
      }
    }
  }
});
```

### 18. What is the difference between findOneAndUpdate and updateOne?
updateOne simply modifies the first matching document and returns a write result indicating how many documents were matched and modified. findOneAndUpdate performs the same update but also returns the actual document, either before or after the update is applied, depending on the options passed. findOneAndUpdate is useful when you need to know the resulting data immediately, such as implementing an atomic counter or a queue-like pattern.

```js
db.counters.findOneAndUpdate(
  { _id: "orderId" },
  { $inc: { seq: 1 } },
  { returnDocument: "after" }
);
```

### 19. What are MongoDB transactions and when would you use them?
MongoDB supports multi-document ACID transactions since version 4.0, allowing multiple operations across one or more collections to be executed atomically. Transactions are useful when you need to update several related documents together, such as transferring funds between two accounts, and require all-or-nothing consistency. Because transactions add overhead, MongoDB's general design philosophy still encourages using embedded documents and single-document atomicity wherever possible to avoid needing them.

```js
const session = client.startSession();
session.startTransaction();
try {
  db.accounts.updateOne({ _id: 1 }, { $inc: { balance: -100 } }, { session });
  db.accounts.updateOne({ _id: 2 }, { $inc: { balance: 100 } }, { session });
  session.commitTransaction();
} catch (e) {
  session.abortTransaction();
}
```

### 20. What is the difference between capped collections and regular collections?
A capped collection is a fixed-size collection that automatically overwrites its oldest documents once it reaches its maximum size, maintaining insertion order. Regular collections grow dynamically and never automatically delete old data unless explicitly instructed to. Capped collections are commonly used for logging, caching, or storing data like recent activity feeds where only the most recent entries matter.

```js
db.createCollection("logs", { capped: true, size: 100000, max: 1000 });
```

### 21. What is the purpose of the explain() method in MongoDB?
The explain() method shows detailed information about how MongoDB executes a given query, including whether it used an index, how many documents were scanned, and the overall execution time. It is the MongoDB equivalent of SQL's EXPLAIN and is essential for diagnosing slow queries in production. Common things to check are the "COLLSCAN" stage, which indicates a full collection scan, versus "IXSCAN," which indicates an index was used.

```js
db.orders.find({ status: "pending" }).explain("executionStats");
```

### 22. What is the difference between a replica set and sharding in MongoDB?
A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability through automatic failover if the primary node goes down. Sharding, on the other hand, is about horizontal scaling, distributing data across multiple servers or shards based on a shard key to handle large datasets and high throughput. In production, these two concepts are often combined, where each shard is itself a replica set for both scalability and fault tolerance.

```js
// Enabling sharding on a database and collection
sh.enableSharding("myDatabase");
sh.shardCollection("myDatabase.orders", { customerId: 1 });
```

---

## Advanced Level

### 23. How does MongoDB achieve high availability using replica sets?
A replica set consists of a primary node that receives all write operations and one or more secondary nodes that replicate data from the primary through an operation log called the oplog. If the primary node becomes unavailable, the remaining nodes hold an election and automatically promote one of the secondaries to primary, typically within a few seconds. This architecture ensures the application can continue functioning with minimal downtime even if a server fails.

```js
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
});
```

### 24. What is a shard key and how do you choose a good one?
A shard key is the field or combination of fields used to distribute documents across different shards in a sharded cluster. A good shard key has high cardinality, distributes writes evenly to avoid hotspots, and aligns with common query patterns so most queries can be routed to a specific shard rather than scanning all of them. Choosing a poor shard key, like one based on a monotonically increasing value, can lead to uneven data distribution and performance bottlenecks.

```js
sh.shardCollection("ecommerce.orders", { customerId: "hashed" });
```

### 25. What is the difference between WiredTiger and older MongoDB storage engines?
WiredTiger is the default storage engine since MongoDB 3.2, offering document-level concurrency control, compression, and better overall performance compared to the older MMAPv1 engine. It uses a B-Tree based storage structure along with a write-ahead log to ensure durability, and it supports both compression and encryption at rest. Document-level locking in WiredTiger, instead of collection-level locking in MMAPv1, allows for much higher write concurrency in modern MongoDB deployments.

```js
db.serverStatus().storageEngine; // { name: "wiredTiger", ... }
```

### 26. What is the aggregation pipeline stage $facet used for?
$facet allows you to process multiple aggregation pipelines within a single stage on the same set of input documents, and it returns the results of each sub-pipeline in separate fields. This is particularly useful for building dashboards or search results pages that need multiple different summaries, like total count and paginated results, from a single query. Without $facet, you would need to run several separate aggregation queries against the same data.

```js
db.products.aggregate([
  {
    $facet: {
      totalCount: [{ $count: "count" }],
      topPriced: [{ $sort: { price: -1 } }, { $limit: 5 }]
    }
  }
]);
```

### 27. What is change streams in MongoDB?
Change streams allow applications to subscribe to real-time changes happening in a collection, database, or entire deployment, such as inserts, updates, and deletes. They are built on top of the oplog and provide a resumable, event-driven way to react to data changes without needing to poll the database. Change streams are commonly used to build real-time notifications, sync data to external systems, or trigger downstream processing pipelines.

```js
const changeStream = db.orders.watch();
changeStream.on("change", (change) => {
  console.log("Change detected:", change);
});
```

### 28. How does MongoDB handle concurrency control?
MongoDB's WiredTiger storage engine uses multi-version concurrency control (MVCC) along with document-level locking, allowing multiple operations to work on different documents within the same collection simultaneously. Write operations on the same document are serialized, but reads can generally proceed without being blocked by ongoing writes due to snapshot isolation. This design allows MongoDB to handle high levels of concurrent read and write traffic without the heavy locking overhead seen in older storage engines.

```js
// Two updates on different documents in the same collection run concurrently
db.inventory.updateOne({ _id: 1 }, { $inc: { stock: -1 } });
db.inventory.updateOne({ _id: 2 }, { $inc: { stock: -1 } });
```

### 29. What are read and write concerns in MongoDB?
Write concern specifies the level of acknowledgment requested from MongoDB before considering a write operation successful, such as waiting for acknowledgment from just the primary or from a majority of replica set members. Read concern controls the consistency and isolation guarantees of the data being read, such as whether it reflects only majority-committed data. These settings let developers fine-tune the tradeoff between performance and consistency based on the specific needs of each operation.

```js
db.orders.insertOne(
  { item: "Phone", qty: 1 },
  { writeConcern: { w: "majority", wtimeout: 5000 } }
);
```

### 30. What is the difference between $set and $addToSet in update operations?
$set assigns a specific value to a field, completely overwriting whatever value was there before, and it works on any field type including arrays. $addToSet is specifically used with array fields and only adds a value to the array if it does not already exist, preventing duplicate entries. This distinction is important when maintaining unique lists, such as tags or category memberships, without introducing accidental duplicates.

```js
db.products.updateOne({ _id: 1 }, { $set: { name: "Updated Name" } });
db.products.updateOne({ _id: 1 }, { $addToSet: { tags: "sale" } });
```

### 31. How would you model a many-to-many relationship in MongoDB?
Many-to-many relationships in MongoDB are typically modeled using an array of references on one or both sides, storing the related document's _id values instead of embedding the full documents. For example, a students collection might store an array of course IDs while a courses collection stores an array of student IDs, or a separate junction collection can be used similar to a relational database. The right approach depends on how large the relationship arrays could grow and whether they need to be queried independently or updated frequently.

```js
// students collection
{ _id: 1, name: "Alice", courseIds: [101, 102] }

// courses collection
{ _id: 101, title: "Databases", studentIds: [1, 2, 3] }
```

### 32. What is the aggregation pipeline optimization strategy in MongoDB?
Aggregation pipeline optimization generally involves placing $match and $sort stages as early as possible so they can take advantage of indexes and reduce the number of documents flowing through later stages. Using $project early to remove unnecessary fields can also reduce the amount of data passed between pipeline stages, improving memory usage. MongoDB's query optimizer automatically applies some pipeline reordering, but understanding these principles helps you write pipelines that perform well even on very large collections.

```js
db.orders.aggregate([
  { $match: { status: "completed" } },       // filter early
  { $project: { customerId: 1, amount: 1 } }, // reduce fields early
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
]);
```

### 33. What is the difference between horizontal scaling in MongoDB versus vertical scaling?
Vertical scaling in MongoDB means increasing the hardware resources of a single server, such as more RAM or CPU, which is simple but limited by physical hardware constraints. Horizontal scaling, achieved through sharding, distributes data and load across multiple servers, allowing MongoDB to handle datasets and throughput far beyond what a single machine could support. Most large-scale production MongoDB deployments rely on a combination of both, scaling vertically until it makes sense to shard, then scaling horizontally afterward.

```js
// Horizontal scaling setup
sh.addShard("shard1/mongo-shard1:27017");
sh.addShard("shard2/mongo-shard2:27017");
```

### 34. How does MongoDB ensure data durability?
MongoDB ensures durability primarily through its write-ahead journal, which records changes before they are applied to the actual data files, allowing recovery after an unexpected crash. Combined with replica sets and appropriate write concerns like "majority," MongoDB can guarantee that acknowledged writes survive even a hardware failure on the primary node. The journal, together with periodic checkpoints in the WiredTiger engine, forms the foundation of MongoDB's crash recovery mechanism.

```js
db.orders.insertOne(
  { item: "Tablet", qty: 2 },
  { writeConcern: { w: "majority", j: true } }
);
```

### 35. What is the difference between $merge and $out in the aggregation pipeline?
$out writes the results of an aggregation pipeline to a new or existing collection, completely replacing its contents if the collection already exists. $merge, introduced later, offers more flexibility by allowing you to insert, update, or merge aggregation results into an existing collection without fully overwriting it. $merge is generally preferred in modern pipelines because it supports incremental updates, which is essential for building materialized views that refresh periodically.

```js
db.dailySales.aggregate([
  { $group: { _id: "$date", total: { $sum: "$amount" } } },
  { $merge: { into: "salesSummary", whenMatched: "merge", whenNotMatched: "insert" } }
]);
```

---

*Tip: For a 6-year experience level interview, be ready to discuss schema design trade-offs (embedding vs referencing), explain how you'd debug a slow aggregation pipeline using explain(), and reason about sharding and replication decisions for real-world scale.*
