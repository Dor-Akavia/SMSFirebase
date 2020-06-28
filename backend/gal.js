var dict = {
  status: '/mobile/commissioning/v1/status',
  identity: '/mobile/commissioning/v1/identity'
}

var pathData = '/mobile/commissioning/v1/status';

if(pathData === dict.status) {
  // Do something
}

var excludes = [dict.status, dict.identity];

if(excludes.includes(pathData)) {
  // Do something else
}


// ****** new vars - 14/06/20
var progressCounter = 0
var isExecuting = false;
// *****

function progress(params) {
  
  if (progressCounter > 0 && progressCounter <= 5) {
    status.totalTime = status.totalTime - 20;
    status.totalProgress = status.totalProgress + 20;
    progressCounter ++
  };
  
  if (progressCounter === 0) {
      isExecuting = true;
      status.totalTime = 100;
      status.totalProgress = 0;
      status.upgradeStatus = 1;
      progressCounter ++
  };

  if (progressCounter === 6) {
      status.totalTime = 0;
      status.totalProgress = 100;
      status.upgradeStatus = 0;
      isExecuting = false;
      progressCounter = 0;
  };

  console.log(status);
  console.log(progressCounter > 0 && progressCounter <= 5);
  console.log(progressCounter);

};