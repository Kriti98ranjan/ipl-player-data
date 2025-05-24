const Player = require("../models/player-model");

// GET /players
exports.getPlayers = async (req, res) => {
  try {
    // Step 1: Extract and parse query params with defaults
    let { page = 1, limit = 10, team, sortBy, search } = req.query;

    // Convert to integers
    page = parseInt(page);
    limit = parseInt(limit);

    // Step 2: Validate pagination inputs
    if (isNaN(page) || page < 1) {
      return res
        .status(400)
        .json({
          error: "Invalid 'page' parameter. Must be a positive number.",
        });
    }

    if (isNaN(limit) || limit < 1) {
      return res
        .status(400)
        .json({
          error: "Invalid 'limit' parameter. Must be a positive number.",
        });
    }

    // Step 3: Build MongoDB query object
    const query = {};
    if (team) {
      query.team = team;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Step 4: Sorting logic
    const validSortFields = ["runs", "salary"];
    const sortOptions = {};
    if (sortBy) {
      if (!validSortFields.includes(sortBy)) {
        return res.status(400).json({
          error: `sorstBy must be one of: ${validSortFields.join(", ")}`,
        });
      }
      sortOptions[sortBy] = -1; // descending order
    }

    // Step 5: Fetch players
    const players = await Player.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Player.countDocuments(query);

    // Step 6: Return this, if no players found
    if (players.length === 0) {
      return res
        .status(404)
        .json({ message: "No players found for the given criteria." });
    }

    // Step 7: Send final success response
    res.status(200).json({
      page,
      limit,
      total,
      players,
    });
  } catch (err) {
    console.error("Error in getPlayers:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// GET /players/id/description
exports.getPlayerDescription = async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).json({ error: "Player not found" });
  res.json(player);
};

// POST /players
exports.createPlayer = async (req, res) => {
  await Player.create(req.body);
  res.status(201).json({ message: "Player created successfully" });
};

// PATCH /players/id
exports.updatePlayer = async (req, res) => {
  const updated = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Player not found" });
  res.json({ message: "Player updated successfully" });
};

// DELETE /players/id
exports.deletePlayer = async (req, res) => {
  const deleted = await Player.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Player not found" });
  res.json({ message: "Player deleted successfully" });
};
