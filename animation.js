
var canvas = document.querySelector("canvas");
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var maxScale = 1;


var noOfFish = 10;


var imgArray = [
    'image/fish1.png',
    'image/fish2.png',
    'image/fish3.png',
    'image/fish4.png',
    'image/fish5.png',
    'image/fish6.png'
]


window.addEventListener('mousemove', function(event){
    MouseEvent.x = event.x;
    MouseEvent.y = event.y
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


function Fish (x, y, dx, dy, scale) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.img = imgArray[Math.floor(Math.random()*imgArray.length)];
    this.scale = scale;

    this.draw = function(){
        var fish = new Object();
        fish["image"] =  new Image();
        fish.image.src = this.img;
        ctx.drawImage (fish.image, this.x, this.y, fish.image.width*this.scale, fish.image.height*this.scale); 
    }

    this.update = function(){
        // if (this.x + this.width > innerWidth || this.x - this.width < 0){
        //     this.dx = -this.dx;
        // }
        // if (this.y + this.height > innerHeight || this.y - this.height < 0){
        //     this.dy = -this.dy;
        // }

        if (this.x > innerWidth || this.x < 0){
            this.dx = -this.dx;
        }
        if (this.y > innerHeight || this.y  < 0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var fishArray = [];

function init(){
    fishArray = [];
    for (i=0; i<noOfFish; i++){
        var x = Math.random()*innerWidth;
        var y = Math.random()*innerHeight;
        var dx = (Math.random() - 0.5)*4;
        var dy = (Math.random() - 0.5)*4;
        var scale = Math.random()*maxScale + 0.25;
        fishArray.push(new Fish(x, y, dx, dy, scale));
    }

}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (i=0; i<fishArray.length; i++){
        fishArray[i].update();
    }
}

init();
animate();


// var imageObj = new Image();
// imageObj.onload = function() {
//     ctx.drawImage(imageObj, 69, 50);
//   };
//   imageObj.src = 'image/fish1.png';


