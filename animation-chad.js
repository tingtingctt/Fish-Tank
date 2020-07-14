
var canvas = document.querySelector("canvas");
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var maxScale = 1;
var maxFishWidth = 186;
var maxFishHeight = 123;


var noOfFish = 20;


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

    this.fish = new Object();
    this.fish["image"] =  new Image();
    this.fish.image.src = this.img;
    
    this.draw = function(rotate){
        rotate ? (ctx.translate(this.x + this.fish.image.width*this.scale/2, this.y + this.fish.image.height*this.scale/2),
        ctx.scale(-1,1)) : "";
        ctx.drawImage (this.fish.image, this.x, this.y, this.fish.image.width*this.scale, this.fish.image.height*this.scale);  
    }


    this.update = function(){
        // if (this.x > innerWidth || this.x < 0){
        //     this.dx = -this.dx;
        // }
        // if (this.y > innerHeight || this.y  < 0){
        //     this.dy = -this.dy;
        // }
        let rotate = false;
        if (this.x + this.fish.image.width*this.scale > innerWidth || this.x < 0){
            this.dx = -this.dx;
            rotate = true
        }
        if (this.y + this.fish.image.height*this.scale > innerHeight || this.y  < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw(rotate);
    }
}

var fishArray = [];

function init(){
    fishArray = [];
    for (i=0; i<noOfFish; i++){
        var x = Math.random()*(innerWidth-maxFishWidth);
        var y = Math.random()*(innerHeight-maxFishHeight);
        var dx = (Math.random() - 0.5)*2;
        var dy = (Math.random() - 0.5)*2;
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


