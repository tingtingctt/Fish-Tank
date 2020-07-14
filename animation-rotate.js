
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

var imgArrayR = [
    'image/fish1R.png',
    'image/fish2R.png',
    'image/fish3R.png',
    'image/fish4R.png',
    'image/fish5R.png',
    'image/fish6R.png'
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


function Fish (x, y, dx, dy, scale, rotate) {
    this.rotate = rotate;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.img = imgArray[Math.floor(Math.random()*imgArray.length)];
    this.scale = scale;

    this.fish = new Object();
    this.fish["image"] =  new Image();

    
    this.draw = function(rotate){

        if (rotate){
            this.fish.image.src = imgArrayR[imgArray.indexOf(this.img)];
            ctx.drawImage (this.fish.image, this.x, this.y, this.fish.image.width*this.scale, this.fish.image.height*this.scale);  
        } else{
            this.fish.image.src = this.img;
            ctx.drawImage (this.fish.image, this.x, this.y, this.fish.image.width*this.scale, this.fish.image.height*this.scale);  
        }

    }


    this.update = function(){
        if (this.x + this.fish.image.width*this.scale > innerWidth || this.x < 0){
            this.dx = -this.dx;
            rotate = !rotate;
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

        let rotate;
        if (dx >= 0){
            rotate = true;
        }else{
            rotate = false;
        }

        fishArray.push(new Fish(x, y, dx, dy, scale, rotate));
    }

}


function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "#030533";
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
    // ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (i=0; i<fishArray.length; i++){
        fishArray[i].update();
    }
}

init();
animate();


