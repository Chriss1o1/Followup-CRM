// Loads the pure logic block from index.html so tests need no build step.
const fs=require('fs'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const logic=html.split('/*LOGIC*/')[1].split('/*END*/')[0];
module.exports=new Function(logic+';return {when,suggest,styleOf,draft,validDate,clean,mergeInto,plus,iso,today,ST}')();
