var express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const website = "https://www.vansterpartiet.se/var-politik/politik-a-o/skattepolitik/";


var router = express.Router();

const getData = () => {

    try {
        axios(website).then((res) => {
            const data = res.data;
            const $ = cheerio.load(data);

            let content = [];

            $('.TextContent-module--component--I1Ox9', data).each(function () {
                const text = $(this).text();
                const url = $(this).find('a').attr('p');

                content.push({
                    text,
                    url
                });

                // app.get('/', (req, res) => {
                //     res.json(content);
                // });
                console.log('KLAR')
            });

            console.log(content)
        });

    } catch (error) {
        console.log(error, error.message);
    }

    return '';
}

router.get('/', function (req, res, next) {
    const comparedTopics = getData()

    res.send(comparedTopics);
});

module.exports = router;

