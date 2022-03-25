const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const fs = require('fs')
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dyut9eifz',
    api_key: '827944147772831',
    api_secret: 'FPv01WigBgL2I1khPHglAnbBTxc',
})

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('public'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const profileUpload = async (req, res, next) => {
    console.log('hit here')
    console.log(req.body, 'req body')
    const { name, type, base64str, user } = req.body.input
    // let fileBuffer = Buffer.from(base64str, "base64");
    // let fileBuffer = Buffer.from(base64str, 'base64');
    // console.log(name, 'this is files name')
    // console.log(base64str, 'this is files data');

    try {
        // fs.writeFileSync("./public/files/" + name, fileBuffer, 'base64');

        const HASURA_MUTATION = `
    mutation($user_id: String!, $image: String!) {
      update_user_by_pk(pk_columns: {id: $user_id}, _set: {avatar: $image}) {
        avatar
        name
      }
    }  
    `

        const uploadedResponse = await cloudinary.uploader.upload(base64str, {
            upload_preset: 'recipe',
        })

        console.log(uploadedResponse, 'hello cloudinary response')

        const variables = { user_id: user, image: uploadedResponse.url }

        const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                query: HASURA_MUTATION,
                variables,
            }),
        })
        const { data, errors } = await fetchResponse.json()
        console.log(data, 'this is data')
        console.log(errors, 'this is error')
        if (errors) {
            return res.status(400).json({
                imageUrl: errors.message,
            })
        }

        return res.json({
            imageUrl: 'hit the backend and finished successfully',
        })
    } catch (e) {
        console.log(e, 'this is catch error')
        next(e)
    }
}

const uploadRecipe = async (req, res, next) => {
    console.log(req.body.input, 'req body')

    // get request input
    const {
        title,
        image,
        category,
        prep_time,
        calories,
        serving,
        description,
        user_id,
        steps,
        ingredients,
    } = req.body.input

    console.log(image,'looop');
    // image.forEach(element => {
    //     console.log(element, 'loooooping');    
    // });

    // const uploadedResponse = await cloudinary.uploader.upload(base64str, {
    //     upload_preset: 'recipe',
    // })

    const HASURA_OPERATION = `
mutation ($title: String!, $image: _text!, $category: String!, $prep_time: Int!, $calories: Int!, $serving: Int!, $description: String!, $user_id: String!, $steps: [steps_insert_input!]!, $ingredients: [ingredient_insert_input!]!) {
  insert_recipe_one(object:
    {
      title: $title, 
      image: $image, 
      category: $category, 
      prep_time: $prep_time, 
      calories: $calories, 
      serving: $serving, 
      description: $description, 
      user_id: $user_id, 
      steps: {
        data: $steps
      }, 
      ingredients: {
        data: $ingredients
      }
    },
  ) 
  {
    id
    title
    image
    category
    prep_time
    calories
    serving
    description
    user_id
    steps{
      step
    }
    ingredients{
      name
      amount
    }
  }
}
`

    const execute = async (variables) => {
        const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: HASURA_OPERATION,
                variables,
            }),
        })
        const data = await fetchResponse.json()
        console.log('DEBUG: ', data)
        return data
    }

    const { data, errors } = await execute({
        title,
        image,
        category,
        prep_time,
        calories,
        serving,
        description,
        user_id,
        steps,
        ingredients,
    })

    // if Hasura operation errors, then throw error
    if (errors) {
        return res.status(400).json(errors[0])
    }

    // success
    return res.json({
        ...data.insert_recipe_one,
    })
}

app.post('/profile_upload', profileUpload)

app.post('/upload_recipe', uploadRecipe)

app.listen(PORT)
