async function getData(){
    response = await fetch("https://docs.google.com/spreadsheets/d/1Av_IDwFo8-eLJLPUELqc_EFZRFUiD5lF2ilt5sAUAQM/export?format=csv")

    if (response.status != 200){
        throw new Error("Status don't 200: "+response.status);
    }

    data = await response.text();
    return csvJSON(data);
}

function csvJSON(csv){
  var lines=csv.replaceAll("\r","").split("\n");
 
  var result = [];
 
  var headers=lines[0].split(",");
 
  for(var i=1;i<lines.length;i++){
 
     var obj = {};
     var currentline=lines[i].split(",");
 
     for(var j=0;j<headers.length;j++){
         obj[headers[j]] = currentline[j];
     }
 
     result.push(obj);
 
  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}