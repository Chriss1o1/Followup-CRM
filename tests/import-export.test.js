const test=require('node:test'),assert=require('node:assert/strict'),L=require('./load');
const lead=(o={})=>Object.assign({t:'lead',id:'l1',u:100,h:[],by:'a',name:'Sam',stage:'New',owner:'a',value:0},o);
test('rejects dangerous ids and unknown types',()=>{const r={};const x=L.mergeInto(r,{},[lead({id:'a"onmouseover="x'}),lead({id:'__proto__'}),lead({id:'toString'}),{t:'weird',id:'z',u:1},null,'str',lead({id:'ok'})]);assert.equal(x.n,1);assert.equal(x.bad,6);assert.ok(r.ok);assert.equal(Object.getPrototypeOf(r),Object.prototype)});
test('whitelists stage and drops bad dates',()=>{const c=L.clean(lead({stage:'<img src=x onerror=alert(1)>',close:'2026-02-31',value:'abc'}));assert.equal(c.stage,'New');assert.equal(c.close,'');assert.equal(c.value,0)});
test('notes and tasks need a valid lead id',()=>{assert.equal(L.clean({t:'note',id:'n',u:1,text:'x'}),null);assert.ok(L.clean({t:'note',id:'n',u:1,lead:'l1',text:'x'}))});
test('newer descendant replaces without conflict',()=>{const r={},c={};L.mergeInto(r,c,[lead()]);L.mergeInto(r,c,[lead({u:200,h:[100],name:'Sam B'})]);assert.equal(r.l1.name,'Sam B');assert.equal(Object.keys(c).length,0)});
test('stale copy is ignored without conflict',()=>{const r={},c={};L.mergeInto(r,c,[lead({u:200,h:[100],name:'New'})]);L.mergeInto(r,c,[lead()]);assert.equal(r.l1.name,'New');assert.equal(Object.keys(c).length,0)});
test('simultaneous edits are flagged, and both replicas agree on the winner',()=>{
 const A={},B={},ca={},cb={};L.mergeInto(A,ca,[lead()]);L.mergeInto(B,cb,[lead()]);
 const ea=lead({u:200,h:[100],by:'a',stage:'Talking'}),eb=lead({u:250,h:[100],by:'b',stage:'Won'});
 L.mergeInto(A,ca,[ea]);L.mergeInto(B,cb,[eb]);L.mergeInto(A,ca,[eb]);L.mergeInto(B,cb,[ea]);
 assert.equal(A.l1.stage,'Won');assert.equal(B.l1.stage,'Won');assert.equal(Object.keys(ca).length,1);assert.equal(Object.keys(cb).length,1);
 assert.equal(Object.values(ca)[0].snap.stage,'Talking')});
test('identical concurrent edits do not raise a conflict',()=>{const r={},c={};L.mergeInto(r,c,[lead({u:200,h:[100],by:'a',stage:'Won'})]);L.mergeInto(r,c,[lead({u:210,h:[100],by:'b',stage:'Won'})]);assert.equal(Object.keys(c).length,0)});
test('export then restore round-trips',()=>{const r={};L.mergeInto(r,{},[lead(),{t:'note',id:'n1',u:5,h:[],by:'a',lead:'l1',text:'hi',date:'2026-10-18'}]);const back={};const x=L.mergeInto(back,{},JSON.parse(JSON.stringify(Object.values(r))));assert.equal(x.bad,0);assert.deepEqual(back,r)});
