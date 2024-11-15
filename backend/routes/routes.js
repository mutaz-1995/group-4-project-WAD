const express = require('express');
const router = express.Router();

const voteController = require('../controllers/controller');


router.get('/', voteController.getContestants);

router.get('/:contestantId', voteController.getContestantById);

router.post('/contestant', voteController.createContestant);

router.post('/vote', voteController.createVote);

router.delete('/vote/:voteId', voteController.deleteVote);

router.get('/:contestantId/votes', voteController.getVoteCount);

module.exports = router;
