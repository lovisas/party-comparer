var express = require('express');
var router = express.Router();
const {readFileSync} = require('fs')

const getPartyInfo = (partyName) => {
    const file = readFileSync(require.resolve('./partyInfoData.txt'))
    const partyinfos = JSON.parse(file)
    const hej = partyinfos.find((info) => info.name === partyName);
    return hej ?? partyinfos;
}

router.get('/', function(req, res, next) {
    const {partyName} = req.query
    const partyInfo = getPartyInfo(partyName)
    res.send(partyInfo);
    next();
});

module.exports = router;