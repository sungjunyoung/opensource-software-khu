/**
 * Created by junyoung on 2017. 6. 17..
 */
var fs = require('fs');

// 찾으려는 디렉토리를 넘겨주지 않으면
if (!process.argv[2]) {
    console.log('please pass argument (dirctory)');
    process.exit();
}

const dir = process.argv[2];

// recursive function
function findTest(dir, fileList) {
    const files = fs.readdirSync(dir);
    fileList = fileList || [];

    files.forEach(function (file) {
        if (fs.statSync(dir + file).isDirectory()) {
            fileList = findTest(dir + file + '/', fileList);
        } else {
            if (file.indexOf('test') !== -1) {
                fileList.push(file);
            }
        }
    });

    return fileList
}

console.log(findTest(dir, []));