var express = require('express');
var router = express.Router();
const { readFileSync } = require('fs')

const getComparedTopics = (partyNames, topic) => {
  const file = readFileSync(require.resolve('./partyInfoData.txt'))
  const partyinfos = JSON.parse(file)

  const comparedTopicsList = [];

  const comparedTopic = { compareTopic: topic, partiesTopicInfo: [] }

  partyinfos.forEach(party => {
    if (partyNames.includes(party.name)) {
      const partyTopic = party.topics.find(t => t.topicName === topic);
      if (partyTopic) {
        comparedTopic.partiesTopicInfo.push(
          {
            partyName: party.name,
            statement: partyTopic.info
          }
        )
      }
    }
  })

  comparedTopicsList.push(comparedTopic)

  return comparedTopicsList;
}

router.get('/', function (req, res, next) {
  const { partyNames, topic } = req.query
  const comparedTopics = getComparedTopics(partyNames, topic)

  res.send(comparedTopics);
});

module.exports = router;
