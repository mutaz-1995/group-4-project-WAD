const HttpError = require('../models/http-errors');
const { v4: uuidv4 } = require('uuid');

let contestants = [
  { id: 'c1', name: 'Contestant 1', votes: 0 },
  { id: 'c2', name: 'Contestant 2', votes: 0 },
  { id: 'c3', name: 'Contestant 3', votes: 0 },
  { id: 'c4', name: 'Contestant 4', votes: 0 },
];

let votes = [];

const getContestants = (req, res, next) => {
  res.status(200).json({ contestants });
};

const getContestantById = (req, res, next) => {
  const contestantId = req.params.contestantId;
  const contestant = contestants.find(c => c.id === contestantId);

  if (!contestant) {
    return res.status(404).json({ message: "Contestant not found." });
  }

  res.status(200).json(contestant);
};


const createContestant = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Contestant name is required.' });
  }

  const newContestant = {
    id: uuidv4(),
    name,
    votes: 0,
  };

  contestants.push(newContestant);

  res.status(201).json({ message: 'Contestant created', contestant: newContestant });
};

const createVote = (req, res, next) => {
  const { contestantId, voterName } = req.body;

  const contestant = contestants.find(c => c.id === contestantId);
  if (!contestant) {
    return res.status(404).json({ message: 'Contestant not found' });
  }

  const vote = {
    id: uuidv4(),
    contestantId,
    voterName,
  };
  votes.push(vote);

  contestant.votes += 1;

  res.status(201).json({ message: 'Vote created', vote });
};

const updateVoteStatus = (req, res, next) => {
  const { voteId } = req.params;
  const { voteStatus } = req.body;

  const vote = votes.find(v => v.id === voteId);
  if (!vote) {
    return res.status(404).json({ message: 'Vote not found' });
  }

  vote.voteStatus = voteStatus;
  res.status(200).json({ message: 'Vote updated', updatedVote: vote });
};

const getVoteCount = (req, res, next) => {
  const contestantId = req.params.contestantId;
  const contestant = contestants.find(c => c.id === contestantId);

  if (!contestant) {
    return res.status(404).json({ message: 'Contestant not found' });
  }

  res.status(200).json({ contestantId: contestant.id, votes: contestant.votes });
};


const deleteVote = (req, res, next) => {
  const { voteId } = req.params;

  const voteIndex = votes.findIndex(vote => vote.id === voteId);
  if (voteIndex === -1) {
    return res.status(404).json({ message: 'Vote not found' });
  }

  const vote = votes[voteIndex];
  const contestant = contestants.find(c => c.id === vote.contestantId);
  
  if (contestant) {
    contestant.votes -= 1; 
  }

  votes.splice(voteIndex, 1);

  res.status(200).json({ message: 'Vote deleted successfully' });
};

exports.getContestants = getContestants;
exports.getContestantById = getContestantById;
exports.createContestant = createContestant;
exports.createVote = createVote;
exports.updateVoteStatus = updateVoteStatus;
exports.getVoteCount = getVoteCount;
exports.deleteVote = deleteVote;
