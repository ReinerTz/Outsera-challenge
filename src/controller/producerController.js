import { QueryTypes } from "sequelize";
import sequelize from "../config/database.js";

const splitProducers = (producersStr) => {
  return producersStr
    .split(/,|and/)
    .map((producer) => producer.trim())
    .filter(Boolean);
};

const expandProducers = (movies) => {
  return movies.flatMap(({ producers, year }) => {
    return splitProducers(producers).map((producer) => ({
      producer,
      year,
    }));
  });
};

const groupProducersByWins = (expandedProducers) => {
  return expandedProducers.reduce((acc, { producer, year }) => {
    if (!acc[producer]) {
      acc[producer] = [];
    }
    acc[producer].push(year);
    return acc;
  }, {});
};

const calculateWinIntervals = (producerMap) => {
  const intervals = [];

  Object.entries(producerMap).forEach(([producer, years]) => {
    years.sort((a, b) => a - b);

    for (let i = 0; i < years.length - 1; i++) {
      const previousWin = years[i];
      const followingWin = years[i + 1];
      const interval = followingWin - previousWin;

      intervals.push({
        producer,
        previousWin,
        followingWin,
        interval,
      });
    }
  });

  return intervals;
};

const filterMinMaxIntervals = (intervals) => {
  const maxInterval = Math.max(...intervals.map(({ interval }) => interval));
  const minInterval = Math.min(...intervals.map(({ interval }) => interval));

  const max = intervals.filter(({ interval }) => interval === maxInterval);
  const min = intervals.filter(({ interval }) => interval === minInterval);

  return { max, min };
};

export const getProducerAwardIntervals = async (_, res) => {
  try {
    const movies = await sequelize.query(
      `
        SELECT producers, year, winner
        FROM Movies
        WHERE winner = 1;
      `,
      { type: QueryTypes.SELECT }
    );

    const expandedProducers = expandProducers(movies);
    const producerMap = groupProducersByWins(expandedProducers);
    const intervals = calculateWinIntervals(producerMap);
    const { max, min } = filterMinMaxIntervals(intervals);

    return res.json({ max, min });
  } catch (error) {
    console.error("Error fetching producer award intervals:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
