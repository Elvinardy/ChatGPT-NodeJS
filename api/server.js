const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: process.env.GPT_ORG,
  apiKey: process.env.GPT_API_KEY
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: message,
        max_tokens: 100,
        temperature: 0,
  })
  /* console.log(req.body); */
  /* console.log(response.data) */
  if(response.data.choices[0].text) {
    res.json({ message: response.data.choices[0].text})
  }
});

app.listen(port, () => {
  console.log("App has started and listening.." + port);
});
