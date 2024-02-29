const express = require('express')
const axios = require('axios')
const app = express()
const { HfInference } = require('@huggingface/inference')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/text2image', async (req, res) => {
	
	
  const {
   token = 'MyToken',
    model = 'prompthero/openjourney-v4',
    prompt = 'generate image of smiling face of small kid',
    parameters,
  } = req.body

  if (!prompt) {
    return res.status(400).send('Missing required parameters: prompt')
  }

  const inference = new HfInference(token)

  try {
    const blob = await inference.textToImage({
      model: model,
      inputs: prompt,
      parameters: parameters,
    })
    const buffer = await blob.arrayBuffer()
    const base64data = Buffer.from(buffer).toString('base64')
    const img = `data:${blob.type};base64,${base64data}`

    res.json({ buffer: img })
  } catch (error) {
    console.error(error)
    res.status(500).send(`Error generating the image: ${error.message}`)
  }
})

// Start the server
const port = 3800
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
  console.log("we are here");
})
