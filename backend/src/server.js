const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const fs = require('fs');
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dyut9eifz",
  api_key: "827944147772831",
  api_secret: "FPv01WigBgL2I1khPHglAnbBTxc"
})



const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.post("/hello", async (req, res) => {
  return res.json({
    hello: "world",
  });
});

const profileUpload = async (req, res, next) => {
  console.log("hit here");
  console.log(req.body, 'req body');
  const { name, type, base64str, user } = req.body.input;
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
    `;

    const uploadedResponse = await cloudinary.uploader.upload(base64str, {
      upload_preset: 'recipe'
    })

    console.log(uploadedResponse, 'hello cloudinary response');

    const variables = { user_id: user, image: uploadedResponse.url };



    const fetchResponse = await fetch("http://localhost:8080/v1/graphql", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
    },
      body: JSON.stringify({
        query: HASURA_MUTATION,
        variables,
      }),
    });
    const { data, errors } = await fetchResponse.json();
    console.log(data, 'this is data');
    console.log(errors, 'this is error');
    if (errors) {
      return res.status(400).json({
        imageUrl: errors.message
      })
    }

    return res.json({
      imageUrl: "hit the backend and finished successfully",
    });
  } catch (e) {
    console.log(e, 'this is catch error')
    next(e);
  }
};
app.post("/profile_upload", profileUpload);

app.listen(PORT);
