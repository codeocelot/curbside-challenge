'use strict'

var request = require('request');
var reqOptions = {};
var secrets = [];

function getSessionId(cb){
	request('http://challenge.shopcurbside.com/get-session',function(err,resp,body){
		console.log('got: ',body);
		reqOptions.headers={'Session':body};
		// getNode('start');
		cb(body);
	})
}

function getNode(id,cb,history){
	reqOptions.url='http://challenge.shopcurbside.com/'+id;
	request(reqOptions,(err,response,body)=>{
		if(!body) return;
		body = JSON.parse(body);
		if(body.error){
			getSessionId(()=>{
				getNode(id,null,history);
			})

			return
		}
		// console.log(body)
		if(body.secret){
			body.history = history;
			secrets.push(body);
			console.log(body.secret);
		}
		else{
			// var body = JSON.parse(body)
			if(!body.next) return;
			// console.log('body.next is', body.next);
			if(Array.isArray(body.next)){
				body.next.forEach((el,i)=>
					{
						console.log('history i', i, history)

						getNode(el,null,history+i)
					}
				);
			} else {
				getNode(body.next,null,history+0);
			}
		}
		if(cb){
			cb();
		}
	})
}

// kickoff
getNode('start',null,'');
// getSessionId((id)=>getNode(id,()=>console.log(secrets)))
// getSessionId((id)=>{
// 	getNode('d9f9a7c4ac0a48959f0de596c91ee90b');
// })
setTimeout(()=>{console.log(secrets)},5000)
