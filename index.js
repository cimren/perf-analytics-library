const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/api/perf_metrics', (req, res) => {
  let url = "https://cihan-perf-analytics-api.herokuapp.com/perf_metrics"; 
  console.log(req.body);
  
  request.post({
    headers: {"content-type" : 'application/json'},
    url: url, 
    body: req.body,
    json: true
  }, function(error, response, body) {
    if(error){
      throw error
    }
    else if (!error && response.statusCode === 201) {
      console.log("Data sent succesfully.");
    }
  }) 
})

app.use(express.static('./example'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});