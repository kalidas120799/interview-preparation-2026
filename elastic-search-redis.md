# Elasticsearch

## Beginner Level

### 1. What is Elasticsearch?
Elasticsearch is a distributed, open-source search and analytics engine built on top of Apache Lucene, designed to store, search, and analyze large volumes of data quickly. It stores data as JSON documents and is optimized for full-text search, making it much faster than traditional databases for search-heavy use cases. It is commonly used for log analytics, application search, and as the backbone of the ELK stack alongside Logstash and Kibana.

```
POST /products/_doc/1
{
  "name": "Wireless Mouse",
  "price": 25.99,
  "category": "Electronics"
}
```

### 2. What is the difference between Elasticsearch and a traditional relational database?
A relational database is optimized for structured data, transactional consistency, and complex joins, while Elasticsearch is optimized for fast full-text search and near real-time analytics over large datasets. Elasticsearch does not enforce strict schemas by default and denormalizes data instead of relying on joins, favoring read performance over strict normalization. It also doesn't provide the same ACID transaction guarantees as a relational database, since it prioritizes availability and search speed.

```
GET /products/_search
{
  "query": { "match": { "name": "wireless mouse" } }
}
```

### 3. What is an index in Elasticsearch?
An index in Elasticsearch is a collection of documents that share similar characteristics, roughly analogous to a table in a relational database or a collection in MongoDB. Each index has its own mapping that defines the fields and data types of the documents it stores. Indexes are the primary unit for organizing, searching, and managing data within an Elasticsearch cluster.

```
PUT /employees
{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "age": { "type": "integer" }
    }
  }
}
```

### 4. What is a document in Elasticsearch?
A document is the basic unit of information that can be indexed in Elasticsearch, represented as a JSON object containing field-value pairs. Every document belongs to an index and is uniquely identified by an ID, which is either auto-generated or provided explicitly. Documents are immutable once indexed, meaning any update actually creates a new version of the document internally.

```
PUT /employees/_doc/1
{
  "name": "Jane Smith",
  "department": "Engineering"
}
```

### 5. What is the difference between a term and a full-text query in Elasticsearch?
A term query searches for an exact match against a field, typically used with "keyword" type fields that are not analyzed or tokenized. A full-text query, like the match query, analyzes the search input using the same analyzer applied to the field during indexing, allowing it to match partial or related text. Understanding this distinction is critical because using a term query on an analyzed text field often returns no results due to tokenization mismatches.

```
GET /products/_search
{
  "query": { "term": { "category.keyword": "Electronics" } }
}
```

### 6. What is an inverted index?
An inverted index is the core data structure that powers Elasticsearch's fast search capabilities, mapping each unique term to the list of documents that contain it. Instead of scanning every document to find matches, Elasticsearch can look up a term directly in the inverted index and instantly retrieve the relevant document IDs. This structure is what makes full-text search dramatically faster than the equivalent LIKE-based search in a relational database.

```
-- Conceptual example, not a real query
-- Term "wireless" -> [doc1, doc5, doc9]
-- Term "mouse"    -> [doc1, doc3]
```

### 7. What is a shard in Elasticsearch?
A shard is a self-contained, independent unit of an index, and Elasticsearch splits every index into one or more shards to distribute data across the cluster. This allows Elasticsearch to scale horizontally, since different shards can live on different nodes and be queried in parallel. Each shard is itself a fully functional Lucene index, and the number of primary shards for an index must be defined at creation time.

```
PUT /logs
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}
```

### 8. What is a replica shard and why is it needed?
A replica shard is a copy of a primary shard that provides redundancy and improves search throughput by allowing read operations to be served from either the primary or its replicas. If a node holding a primary shard goes down, Elasticsearch can automatically promote one of its replicas to become the new primary, ensuring high availability. Having replicas also means write operations become slightly slower since data must be copied to each replica before being acknowledged, depending on configuration.

```
PUT /logs/_settings
{
  "number_of_replicas": 2
}
```

### 9. What is the difference between mapping and schema?
Mapping in Elasticsearch is conceptually similar to a schema in a relational database, defining the fields of a document along with their data types and how they should be indexed. However, unlike a rigid SQL schema, Elasticsearch can automatically infer and create a mapping dynamically the first time a new field appears in a document. Explicitly defining mappings is still recommended in production because it gives control over analyzers, field types, and indexing behavior.

```
PUT /articles
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "published": { "type": "date" }
    }
  }
}
```

### 10. How do you perform basic CRUD operations in Elasticsearch?
Elasticsearch exposes a RESTful API where you use PUT or POST to create documents, GET to retrieve them, POST with an update endpoint to modify them, and DELETE to remove them. Each operation targets a specific index and document ID, and Elasticsearch automatically manages document versioning internally with every change. These operations are near real-time, meaning a newly indexed document typically becomes searchable within about one second, not instantly.

```
PUT /employees/_doc/1
{ "name": "John" }

GET /employees/_doc/1
POST /employees/_update/1 { "doc": { "name": "John Updated" } }
DELETE /employees/_doc/1
```

---

## Intermediate Level

### 11. What is the difference between Query DSL "query" context and "filter" context?
Query context calculates a relevance score for how well each document matches, and is used when you care about how closely a document matches the search terms. Filter context simply checks whether a document matches or not, without calculating a score, and results are cached by Elasticsearch for better performance. As a best practice, exact matching conditions like date ranges or status fields should go in a filter context, while free-text relevance searches belong in a query context.

```
GET /orders/_search
{
  "query": {
    "bool": {
      "must": [{ "match": { "description": "laptop" } }],
      "filter": [{ "term": { "status": "completed" } }]
    }
  }
}
```

### 12. What are analyzers in Elasticsearch?
An analyzer is a component that processes text before it is indexed, breaking it into individual tokens and applying transformations like lowercasing or removing stop words. An analyzer typically consists of a character filter, a tokenizer, and one or more token filters, each performing a specific transformation step. Choosing the right analyzer, such as the standard analyzer versus a custom language-specific one, significantly affects the accuracy and relevance of search results.

```
POST /_analyze
{
  "analyzer": "standard",
  "text": "The Quick Brown Fox"
}
```

### 13. What is the difference between "text" and "keyword" field types?
The "text" field type is analyzed and tokenized, making it suitable for full-text search where partial matches and relevance scoring matter. The "keyword" field type is not analyzed and is stored exactly as provided, making it suitable for exact matches, sorting, aggregations, and filtering. A common pattern is to map a field as both types simultaneously so it can be used for both full-text search and exact-match aggregations.

```
PUT /products
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "fields": { "keyword": { "type": "keyword" } }
      }
    }
  }
}
```

### 14. What are aggregations in Elasticsearch?
Aggregations allow you to compute summary statistics and analytics over your data, similar to GROUP BY in SQL, but far more powerful and flexible. They are categorized into bucket aggregations, which group documents based on criteria, and metric aggregations, which compute values like average, sum, or max over those buckets. Aggregations can also be nested, allowing you to build complex multi-level analytics, such as average price per category per month.

```
GET /products/_search
{
  "size": 0,
  "aggs": {
    "by_category": {
      "terms": { "field": "category.keyword" },
      "aggs": { "avg_price": { "avg": { "field": "price" } } }
    }
  }
}
```

### 15. What is the bool query and its clauses?
The bool query is the most commonly used compound query in Elasticsearch, combining multiple query clauses using must, should, must_not, and filter. "must" clauses need to match and contribute to the score, "should" clauses are optional but boost relevance if matched, "must_not" excludes matching documents, and "filter" matches without affecting the score. This structure gives you fine-grained control to build complex search logic similar to combining AND, OR, and NOT conditions in SQL.

```
GET /products/_search
{
  "query": {
    "bool": {
      "must": [{ "match": { "name": "mouse" } }],
      "must_not": [{ "term": { "discontinued": true } }],
      "should": [{ "match": { "brand": "Logitech" } }]
    }
  }
}
```

### 16. How does relevance scoring work in Elasticsearch?
Elasticsearch uses a scoring algorithm called BM25 by default, which calculates a relevance score for each document based on term frequency, inverse document frequency, and field length normalization. Term frequency measures how often a search term appears in a document, while inverse document frequency reduces the weight of terms that appear in many documents across the index. Understanding scoring is important when tuning search relevance, such as boosting certain fields or using function_score queries to influence ranking.

```
GET /products/_search
{
  "query": {
    "match": { "name": { "query": "wireless mouse", "boost": 2 } }
  }
}
```

### 17. What is the difference between a match query and a match_phrase query?
A match query analyzes the search text and matches documents containing any of the resulting terms, regardless of their order or proximity within the document. A match_phrase query, on the other hand, requires the terms to appear in the exact same order and typically adjacent to each other, similar to searching for an exact phrase. match_phrase is useful when word order matters, such as searching for a specific title or exact expression rather than just related keywords.

```
GET /articles/_search
{
  "query": { "match_phrase": { "title": "quick brown fox" } }
}
```

### 18. What is reindexing in Elasticsearch and why is it needed?
Reindexing is the process of copying documents from one index to another, often necessary because certain settings like the number of shards or field mappings cannot be changed after an index is created. The reindex API allows you to transform data during the copy process, such as renaming fields or applying a script to modify values. This is a common operational task when evolving a schema in a production Elasticsearch cluster without downtime.

```
POST /_reindex
{
  "source": { "index": "products_v1" },
  "dest": { "index": "products_v2" }
}
```

### 19. What is the difference between Elasticsearch's near real-time search and true real-time search?
Elasticsearch is described as near real-time because there is a small delay, by default one second, between when a document is indexed and when it becomes searchable, due to how the underlying Lucene segments are refreshed. This differs from true real-time systems where writes are immediately visible to subsequent reads. This refresh interval can be tuned, and for cases needing immediate visibility, you can explicitly call a refresh, though doing so frequently can hurt indexing performance.

```
POST /products/_refresh
```

### 20. What is the purpose of the _source field?
The _source field stores the original JSON document exactly as it was indexed, and it is what gets returned by default when you retrieve or search for documents. You can disable or selectively include and exclude fields from _source to reduce storage size or prevent sensitive fields from being returned in search results. Disabling _source entirely is rarely recommended since it prevents reindexing, updates, and highlighting from working properly.

```
GET /products/_search
{
  "_source": ["name", "price"],
  "query": { "match_all": {} }
}
```

---

## Advanced Level

### 21. How does Elasticsearch handle distributed search across a cluster?
When a search request is received, the coordinating node forwards the query to all relevant shards, both primary and replica, across the cluster in what's called the query phase. Each shard executes the query locally and returns its top matching results, which the coordinating node then merges, sorts, and returns in the fetch phase. This scatter-gather approach is what allows Elasticsearch to search across massive datasets distributed over many nodes while still returning results quickly.

```
GET /logs-*/_search
{
  "query": { "range": { "timestamp": { "gte": "now-1d" } } }
}
```

### 22. What is the difference between a primary shard and split brain issues in Elasticsearch?
Split brain refers to a scenario where a cluster gets divided into multiple groups of nodes, each believing itself to be the legitimate cluster and independently electing its own master node, leading to data inconsistency. Elasticsearch mitigates this using a quorum-based master election mechanism, requiring a majority of master-eligible nodes to agree before electing a new master. Properly configuring the number of master-eligible nodes, typically an odd number, is essential to avoid this issue in production clusters.

```
-- cluster setting relevant to master eligibility
PUT /_cluster/settings
{
  "persistent": { "cluster.initial_master_nodes": ["node-1", "node-2", "node-3"] }
}
```

### 23. What is the purpose of the function_score query?
The function_score query allows you to modify the relevance score of matching documents using custom functions, such as field value factors, decay functions, or random scoring. It's commonly used to boost popular products, apply recency decay so newer content ranks higher, or incorporate business logic like inventory levels into search ranking. This gives far more control over ranking than relying purely on Elasticsearch's default BM25 scoring algorithm.

```
GET /products/_search
{
  "query": {
    "function_score": {
      "query": { "match": { "name": "mouse" } },
      "field_value_factor": { "field": "popularity", "modifier": "log1p" }
    }
  }
}
```

### 24. How do you optimize Elasticsearch for write-heavy workloads?
Optimizing for write-heavy workloads typically involves increasing the refresh interval to reduce how often new segments are created, using bulk API requests instead of individual indexing calls, and disabling replicas temporarily during large data loads. Choosing an appropriate number of shards upfront is also critical, since resharding later requires a full reindex. Additionally, using auto-generated IDs instead of custom ones can improve indexing throughput because it avoids the extra lookup needed to check for existing document versions.

```
PUT /logs/_settings
{ "refresh_interval": "30s" }

POST /_bulk
{ "index": { "_index": "logs" } }
{ "message": "log entry 1" }
```

### 25. What is the difference between force merge and segment merging?
Elasticsearch automatically merges small Lucene segments into larger ones in the background to improve search performance and reclaim disk space from deleted documents. Force merge is a manual operation that triggers this merging process on demand, typically used on read-only indices, like old daily log indices, to permanently optimize them down to a single segment. Running force merge on an actively written index is discouraged since it's resource-intensive and automatic background merging already handles active indices efficiently.

```
POST /logs-2024-01-01/_forcemerge?max_num_segments=1
```

### 26. What is index lifecycle management (ILM) in Elasticsearch?
Index lifecycle management is a feature that automates how indices transition through different phases, such as hot, warm, cold, and delete, based on age, size, or document count. This is especially useful for time-series data like logs or metrics, where recent data needs fast SSD-backed nodes while older data can move to cheaper storage or eventually be deleted. ILM significantly reduces the operational burden of manually managing rollover and retention policies for large-scale logging or observability use cases.

```
PUT _ilm/policy/logs_policy
{
  "policy": {
    "phases": {
      "hot": { "actions": { "rollover": { "max_size": "50gb" } } },
      "delete": { "min_age": "30d", "actions": { "delete": {} } }
    }
  }
}
```

### 27. How would you design an index for a high-scale search application?
Designing for high scale involves carefully choosing the number of primary shards based on expected data volume, since it cannot be changed without reindexing, and using index aliases to abstract applications away from physical index names. Time-based indices combined with rollover and ILM policies are a common pattern for continuously growing datasets like logs or events. Mapping fields correctly upfront, disabling unnecessary features like _all, and using appropriate analyzers also play a major role in both search performance and relevance quality at scale.

```
PUT /products-000001
{
  "aliases": { "products_search": { "is_write_index": true } }
}
```

---

# Redis

## Beginner Level

### 28. What is Redis?
Redis stands for Remote Dictionary Server, and it is an open-source, in-memory key-value data store often used as a cache, message broker, or primary database. Because it stores data in memory rather than on disk, Redis delivers extremely low latency, typically sub-millisecond response times for most operations. It also supports optional persistence to disk, allowing data to survive restarts while still benefiting from in-memory speed during normal operation.

```
SET user:1:name "Alice"
GET user:1:name
```

### 29. What are the main data types supported in Redis?
Redis supports several core data types beyond simple strings, including Lists, Sets, Sorted Sets, Hashes, and Streams, each optimized for different use cases. Strings are the simplest type and can store text, numbers, or even serialized objects, while Hashes are ideal for representing objects with multiple fields. Choosing the right data type for a given use case, like using a Sorted Set for a leaderboard, is key to using Redis efficiently.

```
LPUSH mylist "item1" "item2"
SADD myset "a" "b" "c"
HSET user:1 name "Alice" age "28"
```

### 30. What is the difference between Redis and traditional databases like MySQL?
Redis is an in-memory data store optimized for extremely fast reads and writes, while traditional databases like MySQL are disk-based and optimized for complex queries, joins, and long-term durable storage of large datasets. Redis typically stores the entire dataset in RAM, which limits how much data it can hold compared to disk-based systems, but this is exactly what makes it so fast. Redis is commonly used alongside a traditional database as a caching layer rather than as a complete replacement for it.

```
-- Typical pattern: check cache first, fall back to database
GET product:101
-- if not found, query MySQL and then SET the result back into Redis
```

### 31. What is the purpose of TTL (Time to Live) in Redis?
TTL allows you to set an expiration time on a key, after which Redis automatically deletes it without requiring any manual cleanup. This is extremely useful for caching scenarios, session storage, or rate limiting, where data should only be valid for a limited period of time. You can set a TTL when creating a key or apply it afterward, and you can also check the remaining TTL or remove it entirely if the key should persist indefinitely.

```
SET session:abc123 "userData" EX 3600
TTL session:abc123
```

### 32. What is the difference between EXPIRE and PERSIST in Redis?
EXPIRE sets or updates the time-to-live on an existing key, after which Redis will automatically remove it from the dataset. PERSIST removes any existing expiration from a key, effectively making it permanent until explicitly deleted. These commands are often used together in caching logic, such as extending a session's lifetime on activity or making certain cached data permanent once it's confirmed to be stable.

```
EXPIRE session:abc123 1800
PERSIST session:abc123
```

### 33. How does Redis persistence work?
Redis offers two main persistence mechanisms: RDB (Redis Database) snapshots, which periodically save the entire dataset to disk as a point-in-time snapshot, and AOF (Append Only File), which logs every write operation and replays them to rebuild the dataset on restart. RDB is more compact and faster to load but can lose data written since the last snapshot, while AOF offers better durability at the cost of larger file sizes and slower restarts. Many production deployments use both mechanisms together to balance performance and durability.

```
CONFIG SET save "900 1 300 10"
CONFIG SET appendonly yes
```

### 34. What is a Redis key and what are the naming conventions?
A Redis key is simply a string used to identify a value in the store, and while Redis places no strict rules on naming, a common convention is to use colon-separated namespaces like "object-type:id:field" to keep keys organized. Following consistent naming conventions makes it much easier to manage, debug, and pattern-match keys later using commands like KEYS or SCAN. Keys should also be kept reasonably short since very long keys consume extra memory across millions of entries.

```
SET user:1001:email "alice@example.com"
SET product:2005:stock 42
```

---

## Intermediate Level

### 35. What is the difference between Redis Lists, Sets, and Sorted Sets?
A List is an ordered collection of elements that allows duplicates and supports operations like pushing and popping from either end, making it suitable for queues or recent activity feeds. A Set is an unordered collection of unique elements, useful for membership checks and set operations like intersection or union. A Sorted Set combines the uniqueness of a Set with an associated score for each element, keeping elements ordered by that score, which makes it perfect for leaderboards or priority queues.

```
ZADD leaderboard 100 "player1" 200 "player2"
ZRANGE leaderboard 0 -1 WITHSCORES
```

### 36. What is Redis pub/sub and how is it used?
Redis pub/sub is a messaging pattern where publishers send messages to named channels, and any subscribers listening on those channels immediately receive the messages in real time. It's a fire-and-forget mechanism, meaning if no subscriber is listening when a message is published, that message is lost and not stored anywhere. Pub/sub is commonly used for real-time notifications, chat applications, or broadcasting cache invalidation events across multiple application instances.

```
SUBSCRIBE notifications
PUBLISH notifications "New order received"
```

### 37. What is the difference between Redis pub/sub and Redis Streams?
Redis pub/sub delivers messages only to subscribers that are actively connected at the time of publishing, with no persistence or replay capability once a message is sent. Redis Streams, introduced in Redis 5.0, persist messages in a log-like structure, allowing consumers to read historical messages, replay them, and use consumer groups for distributed processing similar to Kafka. Streams are the better choice when message durability and guaranteed delivery matter, while pub/sub is simpler and sufficient for ephemeral real-time broadcasts.

```
XADD orders * item "Laptop" qty "1"
XREAD COUNT 10 STREAMS orders 0
```

### 38. What is Redis used for besides caching?
Beyond caching, Redis is commonly used for session storage, distributed locking, rate limiting, real-time leaderboards using Sorted Sets, message queuing with Lists or Streams, and even as a lightweight primary database for certain use cases. Its rich set of atomic data structure operations makes it a versatile tool that goes well beyond simple key-value caching. Many companies also use Redis for geospatial queries, since it has built-in support for storing and querying location-based data.

```
GEOADD locations -122.4194 37.7749 "San Francisco"
GEODIST locations "San Francisco" "Oakland" km
```

### 39. What is the difference between Redis' SET and SETNX commands?
SET assigns a value to a key regardless of whether the key already exists, overwriting any previous value. SETNX, which stands for "set if not exists," only sets the value if the key does not already exist, returning a status indicating whether the operation succeeded. SETNX, or the NX option on the standard SET command, is commonly used to implement simple distributed locks, since it provides an atomic way to ensure only one client can successfully claim a key at a time.

```
SET lock:order:123 "locked" NX EX 10
```

### 40. How do you implement a simple distributed lock using Redis?
A basic distributed lock can be implemented using the SET command with the NX (only set if not exists) and EX (expiration) options together, ensuring the lock is atomically acquired and automatically released after a timeout even if the client crashes. The client that successfully sets the key holds the lock, and it should release the lock by deleting the key once its work is done, ideally using a Lua script to ensure it only deletes its own lock. For more robust distributed locking across multiple Redis nodes, the Redlock algorithm is often recommended instead of a single-node lock.

```
SET resource_lock "client123" NX EX 30
-- ... do work ...
DEL resource_lock
```

### 41. What is Redis eviction policy and why is it important?
When Redis reaches its configured maximum memory limit, an eviction policy determines which keys should be removed to make room for new data, since Redis primarily operates entirely in RAM. Common policies include noeviction, which rejects new writes once memory is full, and various LRU or LFU based policies that remove the least recently or least frequently used keys. Choosing the right eviction policy is critical for cache-like use cases, where allkeys-lru or volatile-lru are common choices to keep the most relevant data in memory.

```
CONFIG SET maxmemory 100mb
CONFIG SET maxmemory-policy allkeys-lru
```

### 42. What is the difference between Redis' MULTI/EXEC and Lua scripting for transactions?
MULTI/EXEC queues a group of commands and executes them sequentially as a single atomic block, but it does not support conditional logic based on the results of earlier commands within the same transaction. Lua scripting, executed via the EVAL command, runs entirely on the server in one atomic step and allows full conditional logic, making it more powerful for complex atomic operations. Lua scripts are often preferred for use cases like implementing atomic check-and-set logic that MULTI/EXEC alone cannot express.

```
MULTI
INCR counter
EXPIRE counter 60
EXEC
```

---

## Advanced Level

### 43. What is Redis replication and how does it work?
Redis replication allows one Redis server, the master, to maintain one or more replica servers that continuously receive a stream of write operations to stay in sync. Replicas can serve read traffic to help scale read-heavy workloads and can also be promoted to master in case the original master fails. Redis replication is asynchronous by default, meaning there is a small window during which data written to the master might not yet be reflected on the replicas.

```
REPLICAOF 192.168.1.10 6379
INFO replication
```

### 44. What is Redis Sentinel and what problem does it solve?
Redis Sentinel is a system designed to provide high availability for Redis by continuously monitoring master and replica nodes, automatically handling failover if the master becomes unavailable. Multiple Sentinel processes work together, using a quorum-based approach to agree that a master is genuinely down before triggering failover, avoiding false positives from a single Sentinel's network issue. Once failover occurs, Sentinel automatically reconfigures the remaining replicas to point to the newly promoted master and notifies connected clients of the change.

```
sentinel monitor mymaster 192.168.1.10 6379 2
sentinel down-after-milliseconds mymaster 5000
```

### 45. What is Redis Cluster and how does it differ from Sentinel?
Redis Cluster provides both high availability and horizontal scalability by automatically sharding data across multiple nodes using a concept called hash slots, of which there are 16384 total, distributed across the cluster. Unlike Sentinel, which manages failover for a single logical dataset replicated across nodes, Redis Cluster actually partitions the dataset itself, allowing it to handle datasets far larger than what a single node's memory could hold. Redis Cluster also has its own built-in failure detection and failover mechanism, similar in concept to Sentinel but integrated directly into the cluster nodes.

```
CLUSTER ADDSLOTS 0 1 2 3
CLUSTER NODES
```

### 46. How does Redis achieve atomicity for its operations?
Redis is fundamentally single-threaded for command execution, meaning each individual command runs to completion before the next one starts, which naturally makes every single command atomic. This design eliminates the need for traditional locking mechanisms for single commands, though multi-command sequences require MULTI/EXEC or Lua scripts to remain atomic as a group. Redis 6 introduced optional multi-threading for I/O operations like reading and writing to sockets, but the actual command execution logic itself remains single-threaded to preserve this atomicity guarantee.

```
EVAL "return redis.call('SET', KEYS[1], ARGV[1])" 1 mykey myvalue
```

### 47. What is the difference between RDB and AOF persistence in terms of trade-offs?
RDB persistence creates compact, binary snapshots at configured intervals, making it fast to restart from and ideal for backups, but any writes since the last snapshot are lost in case of a crash. AOF persistence logs every write operation and can be configured to sync to disk after every write, every second, or let the OS decide, offering much better durability at the cost of a larger file size and slower restart time as the log is replayed. In production, many teams enable both, using RDB for fast full backups and AOF for minimizing data loss, since Redis can rebuild its dataset from AOF while still keeping RDB snapshots for disaster recovery.

```
CONFIG SET appendfsync everysec
BGSAVE
```

### 48. How would you use Redis to implement rate limiting?
A common rate limiting pattern uses the INCR command to count requests from a client within a fixed time window, combined with an EXPIRE set only the first time the key is created to define the window's duration. If the counter exceeds the allowed threshold before the key expires, subsequent requests are rejected until the window resets. More advanced rate limiting algorithms, like the sliding window or token bucket approach, can also be implemented using Sorted Sets or Lua scripts for more precise and fair request throttling.

```
MULTI
INCR rate:user123
EXPIRE rate:user123 60
EXEC
-- Application checks if rate:user123 > allowed_limit
```

---

*Tip: For a 6-year experience level interview, be ready to explain trade-offs like RDB vs AOF, when to use Redis Cluster vs Sentinel, how Elasticsearch shard count decisions affect scaling, and how you'd design a caching or search strategy for a real production system.*
