/*!
 * perfanalytics.js v0.1.0
 * https://github.com/cimren/perf-analytics-library
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
        url= "/api/perf_metrics";
        postData = {
          "url": window.location.href,
          "TTFB": this.getTTFB().toString(),
          "FCP": this.getFCP().toString(),
          "domLoad": this.getDomLoad().toString(),
          "windowLoad": this.getWindowLoad().toString(),
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

PerfAnalytics.prototype.getTTFB = function () {
  var time = window.performance.timing;
  return time.responseStart - time.navigationStart;
};

PerfAnalytics.prototype.getFCP = function(){
  var paintMetric = performance.getEntriesByName("first-contentful-paint");
  return paintMetric.startTime;
};

PerfAnalytics.prototype.getDomLoad = function () {
  var time = window.performance.timing;
  return time.domComplete - time.domLoading;
};

PerfAnalytics.prototype.getWindowLoad = function () {
  var time = window.performance.timing;
  return time.loadEventEnd - time.loadEventStart;
};

PerfAnalytics.prototype.sendAnalytics = function () {  
  this.postData();
};

