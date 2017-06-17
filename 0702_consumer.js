/**
 * Created by junyoung on 2017. 6. 17..
 */
var Producer = require('./0702_producer');
var producer = new Producer();


// producer 가 아이템 추가
producer.on('add', function (t) {
    console.log('+ add: ', t);
});

producer.start();


// consumer 가 아이템 사용
setInterval(function () {
    if (producer.items.length === 0) {
        console.log('items 0!!!! exit');
        process.exit();
    }

    // consume!
    console.log('- consume: ', producer.items[producer.items.length - 1]);
    producer.items.pop();

}, 50);


// stop the clock 10 seconds after
setTimeout(function () {
    console.log('finished!!');
    process.exit();
}, 10e3);

