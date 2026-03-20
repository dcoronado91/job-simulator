const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all players
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM players ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one player
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM players WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create player
router.post('/', async (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

  if (!campo1 || !campo2 || !campo3 || campo4 === undefined || campo5 === undefined || campo6 === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!Number.isInteger(Number(campo4))) {
    return res.status(400).json({ error: 'campo4 must be an integer' });
  }
  if (isNaN(parseFloat(campo5))) {
    return res.status(400).json({ error: 'campo5 must be a float' });
  }
  if (typeof campo6 !== 'boolean') {
    return res.status(400).json({ error: 'campo6 must be a boolean' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO players (campo1, campo2, campo3, campo4, campo5, campo6) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [campo1, campo2, campo3, campo4, campo5, campo6]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update player (full replacement)
router.put('/:id', async (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;

  if (!campo1 || !campo2 || !campo3 || campo4 === undefined || campo5 === undefined || campo6 === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!Number.isInteger(Number(campo4))) {
    return res.status(400).json({ error: 'campo4 must be an integer' });
  }
  if (isNaN(parseFloat(campo5))) {
    return res.status(400).json({ error: 'campo5 must be a float' });
  }
  if (typeof campo6 !== 'boolean') {
    return res.status(400).json({ error: 'campo6 must be a boolean' });
  }

  try {
    const result = await pool.query(
      'UPDATE players SET campo1=$1, campo2=$2, campo3=$3, campo4=$4, campo5=$5, campo6=$6 WHERE id=$7 RETURNING *',
      [campo1, campo2, campo3, campo4, campo5, campo6, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update player (partial)
router.patch('/:id', async (req, res) => {
  const fields = req.body;
  const allowed = ['campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6'];
  const updates = Object.keys(fields).filter(k => allowed.includes(k));

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  const setClauses = updates.map((key, i) => `${key} = $${i + 1}`).join(', ');
  const values = updates.map(k => fields[k]);
  values.push(req.params.id);

  try {
    const result = await pool.query(
      `UPDATE players SET ${setClauses} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE player
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM players WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json({ message: 'Player deleted', player: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
