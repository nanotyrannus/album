$(function() {
   $('#mydiv').focus();
});
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

var record = [];

if(localStorage.arraySet != undefined) {
    record = JSON.parse(localStorage.arraySet);
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
}

var testArray = ["http://imgur.com/XXnxbqA", "http://imgur.com/UcaBqeL",
                 "http://imgur.com/dCmYQ79", "http://imgur.com/dQnCYxM", 
                 "http://imgur.com/FYdJC0Q", "http://imgur.com/qa5Jd0K"];

$(function(){
    $('#left').attr('src', testArray[0] + 's.jpg');
    $('#middle').attr('src', testArray[1]+ 's.jpg');
    $('#right').attr('src', testArray[2]+ 's.jpg');
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

$('body').keydown( function(e) {
    if(e.which == 37){
        //left
        --index;

    }
    if(e.which == 39){
        //right
        ++index;
    }
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
