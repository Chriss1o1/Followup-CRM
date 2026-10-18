const test=require('node:test'),assert=require('node:assert/strict'),L=require('./load');
const B='2026-10-18'; // a Sunday
test('rejects impossible dates',()=>{assert.equal(L.when('call on 31 February',B),'');assert.equal(L.when('call on 2026-02-31',B),'');assert.equal(L.validDate('2026-02-31'),false);assert.equal(L.validDate('2028-02-29'),true)});
test('year boundaries',()=>{assert.equal(L.when('3 January','2026-12-30'),'2027-01-03');assert.equal(L.when('tomorrow','2026-12-31'),'2027-01-01');assert.equal(L.when('in 2 weeks','2026-12-25'),'2027-01-08')});
test('29 Feb resolves to the next real leap day',()=>assert.equal(L.when('29 Feb',B),'2028-02-29'));
test('weekdays and relative phrases',()=>{assert.equal(L.when('Friday',B),'2026-10-23');assert.equal(L.when('next week',B),'2026-10-19');assert.equal(L.when('end of the month','2026-12-10'),'2026-12-31')});
test('no date found',()=>assert.equal(L.when('send the quote',B),''));
