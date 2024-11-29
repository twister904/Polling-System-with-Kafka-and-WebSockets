import { Router } from "express";
import {
  createPollHandler,
  voteHandler,
  fetchPollResultsHandler,
  leaderboardHandler,
} from "../controllers/pollController.js";

const router = Router();
router.get("/leaderboard", leaderboardHandler); //leaderboard
router.post("/polls", createPollHandler); // Poll creation
router.post("/polls/:pollId/vote", voteHandler); // Voting endpoint
router.get("/polls/:pollId", fetchPollResultsHandler); // Fetch poll results

export default router;
