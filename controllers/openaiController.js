const dotenv = require("dotenv");
dotenv.config();


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);

const summary=async(req,res)=>{
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Summarize this \n${text}`,
          max_tokens: 500, //words
          temperature: 0.5,  
        });
        if (data) {
          if (data.choices[0].text) {  //choices array checkfirst position
            return res.status(200).json(data.choices[0].text);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
        });
      }

}

const paragraph=async(req,res)=>{
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `write a detail paragraph about \n${text}`,
          max_tokens: 500,
          temperature: 0.5,
        });
        if (data) {
          if (data.choices[0].text) {
            return res.status(200).json(data.choices[0].text);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
        });
      }
}
const chatbot = async (req, res) => {
    try {
      const { text } = req.body;
      const { data } = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Answer question similar to how yoda from star war would.
        Me: 'what is your name?'
        yoda: 'yoda is my name'
        Me: ${text}`,
        max_tokens: 300,
        temperature: 0.7,
      });
      if (data) {
        if (data.choices[0].text) {
          return res.status(200).json(data.choices[0].text);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        message: err.message,
      });
    }
  };

  const jsconverter=async(req,res)=>{
    try {
        const { text } = req.body;
        const { data } = await openai.createCompletion({
          model: "text-davinci-002",
          prompt: `/* convert these instruction into javascript code \n${text}`,
          max_tokens: 400,
          temperature: 0.25,
        });
        if (data) {
          if (data.choices[0].text) {
            return res.status(200).json(data.choices[0].text);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(404).json({
          message: err.message,
        });
      }
  }

 const scifiImage = async (req, res) => {
    try {
      const { text } = req.body;
      const { data } = await openai.createImage({
        prompt: `generate a scifi image of ${text}`,
        n: 1,
        size: "512x512",
      });
      if (data) {
        if (data.data[0].url) {
          return res.status(200).json(data.data[0].url);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({
        message: err.message,
      });
    }
  };

module.exports={summary,paragraph,chatbot,jsconverter,scifiImage}