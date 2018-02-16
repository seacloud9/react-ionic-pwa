#!/usr/bin/env node --max_old_space_size=20048
var child_process = require('child_process')
child_process.execSync("webpack  --module-bind 'json=json-loader' --progress --profile --colors", function(error, stdout, stderr){
	console.log(stdout)
})
