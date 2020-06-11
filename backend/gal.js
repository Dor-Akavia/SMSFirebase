function greeting(name) {
    console.log(('Hello ' + name));
  }
  
  function processUserInput(callback) {
    var name = 'David';
    callback(name);
  }
  
  processUserInput(greeting);