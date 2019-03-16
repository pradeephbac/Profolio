 var DATA = [['Angular6', 65],
     ['AWS', 85],
['NodeJS', 83],
['AngularJS', 82],
['Angular2', 80],
['Ionic2', 65],
['HTML5', 79],
['CSS3', 79],
['Sass', 79],
['Webpack', 76],
['Gulp', 70],
['Jasmine', 52],
['Karma', 40],
['Mocha', 38],
['Docker', 50],
['Heroku', 34],
['Ruby on Rails', 32],
['Android', 70],
['Elastic Search', 28],
['React', 26],
['JQuery', 84],
['Javascript', 82],
['Jenkns', 60],
['MongoDB', 70],
['Java', 60],
['Spring Boot', 60],
['Spring MVC', 60] ];

var OFFSET = 8;

function getFont(style, size, name) {
return (style + ' ' + size + 'px ' + name);
}

function measureText(text, font, size, context) {
context.font = font;
var metrics = context.measureText(text);
return {
width: metrics.width + 2 * OFFSET,
height: Math.round(size * 1.5)
};
}

function putText(text, font, x, y, context) {
context.font = font;
context.textBaseline = 'top';
context.fillStyle = 'rgba(255, 0, 0, 0.5)';
context.fillText(text, x, y);
}

function testCollision(pixels) {
var i;

for (i = 0; i < pixels.length; i += 4) {
if (pixels[i + 3] > 128) {
return true;
}
}

return false;
}

function getCloud(data, style, name, testid, cloudid) {
var canvasTest = document.getElementById(testid);
var contextTest = canvasTest.getContext("2d");
var canvasCloud = document.getElementById(cloudid);
var contextCloud = canvasCloud.getContext("2d");

var w = 512;
var h = 192;

var i;

for (i = 0; i < data.length; i++) {
var m = data[i];
var text = m[0];
var size = m[1];
var col = true;
var max = 10;
var font = getFont(style, size, name);
var measure = measureText(text, font, size, contextTest);

while (col && (max-- > 0)) {

var x = Math.round(Math.random() * (w - measure.width - OFFSET)) + 2 * OFFSET;
var y = Math.round(Math.random() * (h - measure.height));

var bx = x - OFFSET;
bx = (bx < 0) ? 0 : bx;
var by = y;
var bw = measure.width;
var bh = measure.height;

contextCloud.drawImage(contextTest.canvas, bx, by, bw, bh, bx, by, bw, bh);
putText(text, font, x, y, contextTest);

var img = contextTest.getImageData(bx, by, bw, bh);
col = testCollision(img.data);

if (col) {
contextTest.clearRect(bx, by, bw, bh);
contextTest.drawImage(contextCloud.canvas, bx, by, bw, bh, bx, by, bw, bh);
size = Math.max(Math.round(size * 0.85), 10);
font = getFont(style, size, name);
measure = measureText(text, font, size, contextTest);
}

contextCloud.clearRect(bx, by, bw, bh);
}
}
}

$(document).ready(function() {   
getCloud(DATA, 'bold italic', 'Amaranth', 'test', 'cloud');
});
