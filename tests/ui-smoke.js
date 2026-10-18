const {JSDOM}=require('jsdom'),fs=require('fs');
const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
const errs=[];
const dom=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',pretendToBeVisual:true,beforeParse(w){
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};
 w.alert=m=>errs.push('ALERT:'+m);w.confirm=()=>true;w.addEventListener('error',e=>errs.push('ERR:'+e.message))}});
const w=dom.window,d=w.document,$=s=>d.querySelector(s),click=sel=>{const e=typeof sel==='string'?$(sel):sel;e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}))};
const ok=(c,m)=>console.log((c?'PASS ':'FAIL ')+m);
ok(/What’s your name/.test($('#view').innerHTML),'onboarding shows');
$('#myname').value='Dev';click('[data-a=start]');ok($('#nav').children.length===3,'nav renders after start');
$('#qa').value='Maria Lopez, maria@x.com, call went well. send quote next Tuesday';$('#quick').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
ok(/Maria Lopez/.test($('#view').innerHTML),'quick add creates lead');
click('[data-a=tab][data-v=today]');ok(/Send quote next Tuesday/.test($('#view').innerHTML),'task suggestion created from note');
click('[data-a=open]');ok($('#dlg').open&&/Next steps/.test($('#dlg').innerHTML),'lead dialog opens');
$('#n_text').value='Follow up Friday';$('#n_text').dispatchEvent(new w.Event('input',{bubbles:true}));ok(/Follow up Friday/.test($('#sug').innerHTML),'live suggestions in dialog');
click('[data-a=draft]');ok(/Draft message/.test($('#dlg').innerHTML),'draft renders');click('[data-a=hand]');ok(/Hand-off summary/.test($('#dlg').innerHTML),'hand-off renders');
click('[data-a=save]');
// hostile import via the merge path
const evil=[{t:'lead',id:'e1',u:5,h:[],by:'x',name:'<img src=x onerror=window.PWNED=1>',stage:'"><script>window.PWNED=1</script>',owner:'x',value:5},{t:'lead',id:'bad"id',u:5,name:'z'}];
const x=w.merge(evil);click('[data-a=tab][data-v=leads]');
ok(x.n===1&&x.bad===1,'hostile import: 1 kept, 1 rejected');ok(!w.PWNED&&!$('#view img')&&!$('#view script'),'no script/HTML injected into DOM');
// conflict flow
const L=Object.values(w.eval('S').recs).find(r=>r.t==='lead'&&r.name==='Maria Lopez');
w.merge([Object.assign({},L,{u:L.u+5000,h:[...L.h,L.u],by:'other',stage:'Won'})]);
w.merge([Object.assign({},L,{u:L.u+4000,h:[...L.h,L.u],by:'third',stage:'Lost'})]);
click('[data-a=tab][data-v=today]');ok(/Needs review/.test($('#view').innerHTML),'conflict banner appears');
click('[data-a=cfkeep]');ok(!/Needs review/.test($('#view').innerHTML),'keep-current resolves the conflict');
// delete + restore
click('[data-a=tab][data-v=leads]');click('[data-a=open]');
const id=w.eval('cur');click('[data-a=del]');click('[data-a=tab][data-v=team]');ok(/Recently deleted/.test($('#view').innerHTML)&&/data-a="undel"/.test($('#view').innerHTML),'deleted lead listed');
click('[data-a=undel]');ok(w.eval("R('lead')").some(l=>l.id===id),'restore brings lead back');
// corrupt storage is preserved, not wiped
const dom2=new JSDOM(html,{runScripts:'dangerously',url:'https://x.test/',beforeParse(w2){w2.localStorage.setItem('followup.v1','{broken');w2.HTMLDialogElement.prototype.showModal=()=>{}}});
ok(dom2.window.localStorage.getItem('followup.v1.corrupt')==='{broken'&&/could not be read/.test(dom2.window.document.querySelector('#banner').innerHTML),'corrupt data kept + user warned');
console.log(errs.length?errs.join('\n'):'no runtime errors');
process.exit(0)
