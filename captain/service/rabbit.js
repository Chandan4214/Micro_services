const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBIT_URL;
let channel;

async function connect() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  console.log("--------->>>> connected to rabbitmq");
}

async function subscribeToQueue(queueName, callback) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  
  channel.consume(queueName, (message) => {
    if (message !== null) {
      try {
        const content = message.content.toString(); // ✅ FIX
        callback(content);
        channel.ack(message);
      } catch (err) {
        console.error("Error handling message:", err);
        channel.nack(message, false, false); // reject bad message
      }
    }
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


















// const amqp = require('amqplib');

// const RABBITMQ_URL = process.env.RABBIT_URL;
// let channel;

// async function connect() {
  
//   const connection = await amqp.connect(RABBITMQ_URL);
//   channel = await connection.createChannel();

//   console.log("--------->>>>connected to rabbitmq");
// }

// async function subscribeToQueue(queueName, callback) {
//   if (!channel) await connect();
//   await channel.assertQueue(queueName);
//   channel.consume(queueName, (message) => {
//     callback(message.connect.tostring());
//     channel.ack(message);
//   });
// }

// async function publishToQueue(queueName, message) {
//   if (!channel) await connect();
//   await channel.assertQueue(queueName);
//   channel.sendToQueue(queueName, Buffer.from(message));
// }

// module.exports = {
//   subscribeToQueue,
//   publishToQueue,
//    connect
// };
