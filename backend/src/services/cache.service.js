const { createClient } = require('redis');
// AWS: optional use of S3 for assets, SES for notifications (see aws-sdk).

let redisClient = null;

async function getRedisClient() {
  if (redisClient) return redisClient;
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  redisClient = createClient({ url });
  redisClient.on('error', (err) => console.error('Redis error:', err));
  await redisClient.connect();
  return redisClient;
}

async function get(key) {
  const client = await getRedisClient();
  const val = await client.get(key);
  return val ? JSON.parse(val) : null;
}

async function set(key, value, ttlSeconds = 300) {
  const client = await getRedisClient();
  await client.setEx(key, ttlSeconds, JSON.stringify(value));
}

async function del(key) {
  const client = await getRedisClient();
  await client.del(key);
}

module.exports = { get, set, del, getRedisClient };
