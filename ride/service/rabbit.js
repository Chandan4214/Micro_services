const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBIT_URL;
let channel;

async function connect() {
  
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  console.log("connected to rabbitmq");
}

async function subscribeToQueue(queueName, callback) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  channel.consume(queueName, (message) => {
    callback(message.connect.toString());
    channel.ack(message);
  });
}

async function publishToQueue(queueName, message) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(message));
}

module.exports = {
  subscribeToQueue,
  publishToQueue,
   connect
};
