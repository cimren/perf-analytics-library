/*!
 * perfanalytics.js v0.1.0
 * https://github.com/cimren
 *
 * Copyright (c) 2020 Cihan Imren
 */

function PerfAnalytics() {

  this.getData = function(){
    var request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/todos/1");
    request.send();
    request.onload = function(){
      console.log(request);
      if(request.status === 200){
        console.log(JSON.parse(request.response));
      } else{
        console.log(request.status);
      }
    }    
  };

  this.postData = function(){
    var request = new XMLHttpRequest(),
        url= "/api/perf_metrics";//"https://cihan-perf-analytics-api.herokuapp.com/perf_metrics",
        postData = {
          "url": window.location.href,
          "TTFB": this.getTTFB().toString(),
          "FCP": "44",
          "domLoad": "98",
          "windowLoad": "123",
          "datetime": "1109201510"
        };    
    
    request.open("POST", url, true);
    request.setRequestHeader('Content-type', 'application/json');    
    request.send(JSON.stringify(postData));
    request.onload = function(){
      console.log(request);
      if(request.status === 200){
        console.log(JSON.parse(request.response));
      } else{
        console.log(request.status);
      }
    }  
  }

}

PerfAnalytics.prototype.init = function () {
  console.log("PerfAnalytics initialized");
};

PerfAnalytics.prototype.getResult = function (data) {
  return "your data:" + data;
};

PerfAnalytics.prototype.getTTFB = function () {
  var time = window.performance.timing;
  return time.responseStart - time.navigationStart;
};

PerfAnalytics.prototype.sendAnalytics = function () {
  //this.getData();
  this.postData();
};

