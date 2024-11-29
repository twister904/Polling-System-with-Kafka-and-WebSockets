import { Kafka } from "kafkajs";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const kafka = new Kafka({
  clientId: "polling-system",
  brokers: [process.env.KAFKA_BROKER], // Update this if your broker is on a different host/port
});

export const setupKafka = async () => {
  const admin = kafka.admin();

  try {
    console.log("Connecting to Kafka Admin...");
    await admin.connect();
    console.log("Kafka Admin connected successfully!");

    // Create topic with partitions
    const topic = "votes";
    console.log(`Creating topic [${topic}] with 3 partitions...`);
    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: 3, // Set the number of partitions
        },
      ],
    });
    console.log(`Topic [${topic}] created successfully!`);
  } catch (error) {
    console.error("Error in Kafka setup:", error);
  } finally {
    await admin.disconnect();
    console.log("Kafka Admin disconnected.");
  }
};

export default kafka;
