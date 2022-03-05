var fs = require('fs');

var fast=require('fast-csv');

const csv = require('csv-parser');

var ws = fs.createWriteStream('myAUS.csv')
 
let all_data=[]

fs.createReadStream('AUS.csv')
	.pipe(csv({}))
	.on('data',function(data){
		all_data.push(data)
		// console.log(all_data)
	})
	.on('end',function(data){
		let result=[]
		all_data.forEach((data,index)=>{
	//console.log(data)
	//console.log(index+' '+data['Copyright Information'])
	
		let obj2={
			"filename":data['Asset ID'],
			"title":data['Title'],
			"Genre": data['Genre'],
       		"Rating": data['Rating'],
			"Short_Synopsis": data['Short Synopsis'],
			"adBreaks": data['Ad Breaks'],
			"Director": data['Director'],
			"Cast": data['Cast'],
			"Runtime": data['Runtime'],
			"HD": data['HD'],
			"license_start_date": `${data['Avail Start']}T00:00:00.000Z`,
			"license_end_date": `${data['Avail End']}T00:00:00.000Z`,
			"release date":data['Release']
		}
		//console.log(obj)
		
		var str1=parseInt(data['Asset ID'])
		var str2=JSON.stringify(obj2)
		
		 let info=[]
		info.push(str1)
		info.push(str2)
		result.push(info)
  
	 
		//fs.appendFileSync("programming.txt",str2);
		
		
	   })
	//    let final=[]
	//    final.push(result)
	   
	   fast.write(
	   		result,
	   		{headers:true}
	   	    )
	     .pipe(ws);
	});

