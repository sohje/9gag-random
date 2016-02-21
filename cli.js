#!/usr/bin/env node
'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');

const dlImage = (imgUrl, imgName) => {
    let req = http.request(imgUrl, (res) => {
        let image = '';
        res.setEncoding('binary')
        res.on('data', (chunk) => {
            image += chunk;
        });
        res.on('end', () => {
            saveFile(imgName, image)
        });
        res.on('error', (err) => {throw err})
    })
    req.end();
}

const saveFile = (name, data) => {
    fs.writeFile(name, data, 'binary', (err) => {
        if (err) throw err;
        console.log(`Saved as ${name}`)
    })
}

http.get({hostname: '9gag.com', port: 80, path: '/random', agent: false},
    (res) => {
        let imgUrl = url.parse(res.headers.location)['path'].split('/').pop()
        let imgName = imgUrl + '.png';

        imgUrl = `http://img-9gag-fun.9cache.com/photo/${imgUrl}_700b.png`
        // let imgUrl_v1 = `http://img-9gag-fun.9cache.com/photo/${imgUrl}_700b_v1.png`
        dlImage(imgUrl, imgName);
    }
)
