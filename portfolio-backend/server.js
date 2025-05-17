const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());



// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'portfolio_linux_db',
  password: '123',
  port: 5432,
});
app.get('/', (req, res) => {
  res.send('Portfolio backend server is running.');
});


// API endpoint to get profile data
app.get('/api/profile', async (req, res) => {
  const userId = 1;

  try {
    // Fetch user profile
    const userRes = await pool.query('SELECT * FROM user_profile WHERE id = $1', [userId]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = userRes.rows[0];

    // Fetch contact
    const contactRes = await pool.query('SELECT email, phone FROM contact WHERE user_id = $1', [userId]);
    const contact = contactRes.rows[0] || {};

    // Fetch socials
    const socialsRes = await pool.query('SELECT github, linkedin, twitter, dribbble FROM socials WHERE user_id = $1', [userId]);
    const socials = socialsRes.rows[0] || {};

    // Fetch skills
    const skillsRes = await pool.query(`
      SELECT s.category, si.skill_name
      FROM skills s
      JOIN skills_items si ON s.id = si.skill_id
      WHERE s.user_id = $1
      ORDER BY s.category
    `, [userId]);
    
    const skills = {};
    skillsRes.rows.forEach(row => {
      if (!skills[row.category]) {
        skills[row.category] = [];
      }
      skills[row.category].push(row.skill_name);
    });

    // Fetch experience
    const experienceRes = await pool.query(`
      SELECT role, company, duration, details
      FROM experience
      WHERE user_id = $1
      ORDER BY user_id ASC
    `, [userId]);
    const experience = experienceRes.rows;

    // Send response
    res.json({
      name: user.name,
      picture: user.picture,
      title: user.title,
      about: user.about,
      location: user.location,
      availability: user.availability,
      contact,
      socials,
      skills,
      experience
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);        
});