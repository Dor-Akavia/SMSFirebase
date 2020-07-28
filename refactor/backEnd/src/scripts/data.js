const path = require('path');

var paths = {
    baseDir: path.resolve('/projects/setapp2/refactor'),
    frontEndDir: path.resolve('/projects/setapp2/refactor/frontEnd'),
    backEndDir: path.resolve('/projects/setapp2/refactor/backEnd'),
    srcDir: path.resolve('/projects/setapp2/refactor/backEnd/src'),
    scriptsDir: path.resolve('/projects/setapp2/refactor/backEnd/src/scripts')
};

var runType = 'normal'

console.log('Data file loaded successfully');

exports.paths = paths
exports.runType = runType