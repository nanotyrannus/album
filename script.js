Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.peek = function () {
    return this[this.length-1];
}

function getParam(param) {
    var hash = location.hash.substring(1);
    var list = hash.split('&');
    for(var i = 0; i < list.length; ++i){
        var pair = list[i].split('=');
        if(pair[0]===param) return pair[1];
    }
    return false;
}

function parseAlbum(album) {
    for ( var i = 0; i < album.data.length; ++i) {
        imageObjArr.push(album.data[i]);
    }
}


var albumIDs = [];
var albumObjArr = [];
var imageObjArr = [];
var xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", function(event) {
        var albumObj = JSON.parse(xhr.responseText);
        albumObjArr.push(albumObj);
        parseAlbum(albumObj);
    }, false);

function setHeader(xhrObj){ //sets request header
    xhrObj.setRequestHeader('Authorization', 'Bearer ' + getParam('access_token'));
}

function getAlbum(id){
    xhr.open('GET', 'https://api.imgur.com/3/album/' + id + '/images');
    setHeader(xhr);
    xhr.send();
}




//driver
getAlbum('1ooOe');
albumObjArr.push(JSON.parse(xhr.responseText));
imageObjArr.push.apply(imageObjArr, albumObjArr.peek());


$(function(){
    var login = $('#login');
    var username = $('#username');
    if(location.hash === ''){
        username.text('LOGIN');
        login.attr('href', 'https://api.imgur.com/oauth2/authorize?client_id=12828f50fa4b69b&response_type=token');
    } else {
        username.text(location.hash);
        username.text('Logged in as: ' +  getParam('account_username'));
    }
});

var record = [];

if(localStorage.arraySet != undefined) {
    record = JSON.parse(localStorage.arraySet);
    document.getElementById('set').value = record.join(',');
}

function push() {
    var str = document.getElementById('user').value;
    if (!record.contains(str)) {
        record.push(str);
    }
    document.getElementById('set').innerHTML = record.join(",");
    save();
}

function save() {
    localStorage.arraySet = JSON.stringify(record);
    document.getElementById('set').value = record.join(',');
}

var testArray = ["http://imgur.com/XXnxbqA", "http://imgur.com/UcaBqeL",
                 "http://imgur.com/dCmYQ79", "http://imgur.com/dQnCYxM", 
                 "http://imgur.com/FYdJC0Q", "http://imgur.com/qa5Jd0K"];



$(function(){
    $('#left').attr('src', testArray[0] + 's.jpg');
    $('#middle').attr('src', testArray[1] + 's.jpg');
    $('#right').attr('src', testArray[2] + 's.jpg');
});

var index = 1;

var s = document.getElementById("left");
$('#pictures').click( function(){
    $('#pictures').focus();
});

/*
which:
37 left
38 up
39 right
40 down
*/
var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');
var main = document.getElementById('main_image');

$('body').keydown( function(e) {
    if(e.which == 37){
        //left
        --index;

    }
    if(e.which == 39){
        //right
        ++index;
    }
        setImage(main, testArray[index], false);
        setImage(left, testArray[index-1], true);
        setImage(middle, testArray[index], true);
        setImage(right, testArray[index+1], true);
});

function setImage(img, src, thumb){
    if(src  != undefined){
        img.src = thumb ? (src + "s.jpg") : (src + ".jpg");
    } else {
        img.src = "x.png";
    }
}
