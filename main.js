'use strict'
var _ = require('underscore')
var request = require('request');
var reqOptions = {};

function getSessionId(cb){
	request('http://challenge.shopcurbside.com/get-session',function(err,resp,body){
		reqOptions.headers={'Session':body};
		cb(body);
	})
}

function getNode(id,history){
	reqOptions.url='http://challenge.shopcurbside.com/'+id;
	return new Promise((resolve,reject)=>{
		request(reqOptions,(err,response,body)=>{
			if(!body) return;
			body = JSON.parse(body);
			if(body.error){
				if(body.error === 'Page not found') return resolve();
				return getSessionId(()=>{
					resolve(getNode(id,history));
				})
			}
			if(body.secret){
				body.history = history;
				resolve(body);
			}
			else{
				if(Array.isArray(body.next)){
					var promises = body.next.map((n,i)=>{
						return getNode(n,history+i);
					})
					Promise.all(promises).then(results=>resolve(results))
				} else {
					resolve(
						getNode(body.next,history+0)
					);
				}
			}
		})
	})
}

function rmNulls(arr){
	return arr.filter(el=>{return el !== undefined })
}

function sortNodes(arr){
	return arr.sort((a,b)=>{
		a = a.history;
		b = b.history;
		return parseInt(a,10) - parseInt(b,10); // assumption: no more than 10 branching factor
	})
}

function getMessage(){
	// kickoff
	getNode('start','').then(nodes=>{
		nodes = _.flatten(nodes);
		nodes = rmNulls(nodes);
		var sorted = sortNodes(nodes);
		sorted.forEach(s=>console.log(s.secret))
	});
}

module.exports = getMessage;
module.exports.getNode = getNode; // expose for tests.
