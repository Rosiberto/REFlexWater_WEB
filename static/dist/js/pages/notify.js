  //var button = document.querySelector('button');
  
  var evtSourceCritical = new EventSource('http://localhost:8080/queue/critical');
  evtSourceCritical.onopen = function() {
    console.log("Connection to server opened.");
  };

  evtSourceCritical.onmessage = function(c) {
    document.getElementById('txtCritical').innerHTML = c.data;
  };

  evtSourceCritical.onerror = function() {
    console.log("EventSource failed.");
  };

  
  var evtSourceInfo = new EventSource('http://localhost:8080/queue/info');
  evtSourceInfo.onopen = function() {
    console.log("Connection to server opened.");
  };

  evtSourceInfo.onmessage = function(i) {
    document.getElementById('txtInfo').innerHTML = i.data;
  };

  evtSourceInfo.onerror = function() {
    console.log("EventSource failed.");
  };

  var evtSourceWarn = new EventSource('http://localhost:8080/queue/warn');
  evtSourceWarn.onopen = function() {
    console.log("Connection to server opened.");
  };

  evtSourceWarn.onmessage = function(w) {
    document.getElementById('txtWarning').innerHTML = w.data;
  };

  evtSourceWarn.onerror = function() {
    console.log("EventSource failed.");
  };

 /* 
  button.onclick = function() {
    console.log('Connection closed');
    evtSourceCritical.close();
    evtSourceInfo.close();
    evtSourceWarn.close();
  };
 */
