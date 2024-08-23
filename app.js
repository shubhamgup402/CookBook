const path = require('path');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 10001;
const API_KEY = 'AIzaSyCcEFT2CTF1xXYEA_5WUwzFlYMoIR11lQA';

const genAI = new GoogleGenerativeAI(API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(`Give me a 2 or 3 recipe only that includes the following ingredients: ${prompt}`);
    const response = await result.response;
    const text = await response.text();

    res.json({ result: text });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: "Sorry, I couldn't find a recipe with those ingredients." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// new 7440ef8a41ef436eb2753ee85f343a75


// old 850cdd494c884456a200b02987f6d624