const test=require('node:test'),assert=require('node:assert/strict'),L=require('./load');
test('splits unrelated actions in one note',()=>{const s=L.suggest('Send quote next Tuesday and call Sam on 3 Nov. Likes the blue one');assert.equal(s.length,2);assert.match(s[0].text,/^Send quote/);assert.match(s[1].text,/^Call Sam/)});
test('ignores chatter',()=>assert.deepEqual(L.suggest('Great call, very positive'),[]));
test('defaults to 3 days when no date is given',()=>assert.equal(L.suggest('email the deck')[0].due,L.plus(L.today(),3)));
test('an impossible date still yields a valid due date',()=>assert.ok(L.validDate(L.suggest('call Sam on 31 Feb')[0].due)));
test('caps suggestions at 4',()=>assert.equal(L.suggest('call a. call b. call c. call d. call e. call f').length,4));
