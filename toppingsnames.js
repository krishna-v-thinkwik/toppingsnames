const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Function to extract and normalize toppings
function extractToppings(input) {
  const segments = input.split(/for\s+\w+/gi);
  let toppingsText = segments.join(', ');

  toppingsText = toppingsText.replace(/\band\b/gi, ',');

  let toppings = toppingsText
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  return toppings.join(' and ');
}

// POST endpoint
app.post('/parse-toppings', (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Missing "input" in request body' });
  }

  const result = extractToppings(input);
  res.json({ result });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
  
