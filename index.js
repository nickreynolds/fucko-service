const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 4000;


const pinJSONToIPFS = (JSONBody, callback) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    console.log("start PINNING");
    axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_API_KEY_secret
            }
        }).then((response, error) => {
            // console.log("pinJSONToIPFS res: ", response);
            if (response) {
                callback(response, null);
            } else {
                console.log("error: ", error);
                callback(null, error);
            }
        })
};

app.use(cors());
app.use(bodyParser.text())
app.get('/', (req, res) => res.send('Fucko!'));
app.post('/save-code', async (req, res) => {
    // console.log("Save Code req: ", req)
    console.log("Save Code req.body: ", req.body)
    pinJSONToIPFS({"code": req.body+""}, (pinRes, error) => {
        console.log("Save Code pinRes.data: ", pinRes.data);
        if (error) {
            res.send(error)
        } else {

            res.send(pinRes.data);
        }
    })
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));