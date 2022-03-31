const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { Sequelize } = require('sequelize')
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dyut9eifz',
    api_key: '827944147772831',
    api_secret: 'FPv01WigBgL2I1khPHglAnbBTxc',
})

const app = express()
const PORT = process.env.PORT || 8000
const POSTGRES_CONNECTION_STRING =
    'postgres://postgres:postgrespassword@localhost:5432/postgres'

// app.use(express.json())
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
    console.log(req, 'req body authorization')

    // get request input
    let {
        title,
        // images,
        category,
        prep_time,
        calories,
        serving,
        description,
        user_id,
        steps,
        ingredients,
    } = req.body.input

    const HASURA_OPERATION = `
    mutation ($title: String!, $images: [images_insert_input!]!, $category: String!, $prep_time:Int!, $calories:Int!, $serving: Int!, $description: String!, $user_id: String!, $steps:[steps_insert_input!]!, $ingredients: [ingredient_insert_input!]!){
        insert_recipe_one(object: {
          title:$title,
          category:$category,
          prep_time:$prep_time,
          calories:$calories,
          serving:$serving,
          description: $description,
          user_id:$user_id,
          images: {
            data: $images
          },
          steps: {
            data: $steps
          },
          ingredients: {
            data: $ingredients
          } 
        }){
          title
          images{
            url
          }
          steps{
            step
          }
          ingredients{
            name
          }
        }
      }
`

    const execute = async (variables) => {
        // console.log(variables, 'inside exe async')
        // variables.images = [{"url": "hello guys"}]
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
    const images = []
    let err
    let dat
    await Promise.all(
        req.body.input.images.map(async (image) => {
            const cloudRes = await cloudinary.uploader
                .upload(image.url, {
                    upload_preset: 'recipe',
                })
                .then(function (res) {
                    //   console.log(res.url,'response url');
                    images.push({ url: res.url })
                    prep_time = prep_time.toString()
                    return images
                })
        })
    ).then(async (response) => {
        console.log(' ==================BEFORE ============================= ')
        prep_time = prep_time.toString()
        const { data, errors } = await execute({
            title,
            images,
            category,
            prep_time,
            calories,
            serving,
            description,
            user_id,
            steps,
            ingredients,
        })
        dat = data
        err = errors
        if (errors) {
            return res.status(400).json(errors[0])
        }

        return res.json({
            ...data.insert_recipe_one,
        })
    })
}

app.post('/profile_upload', profileUpload)

app.post('/upload_recipe', uploadRecipe)

app.post('/rating_event_trigger', async (req, res) => {
    console.log(req.body.event.data.new)
    const recipe_id = req.body.event.data.new.recipe_id

    const sequelize = new Sequelize(POSTGRES_CONNECTION_STRING, {})

    await sequelize.query(
        'UPDATE recipe set avg_rating = rating_avg(:recipe_id) where id = :recipe_id;',
        {
            replacements: {
                recipe_id,
            },
        }
    )
})

app.listen(PORT)
