const display= document.getElementById("display");
const ctx= display.getContext("2d");

const inf= document.getElementById("info");
const ctxInf=inf.getContext("2d");

var grid= createMatriz(10,20);
var gridColor= createMatriz(10,20);

var lastTime = 0;
var dropCounter=0;
var dropInterval=1000;
var _Colision=false;
var points=1;
var lvl=1;

document.addEventListener("keydown",move);

ctxInf.scale(25,25);
ctx.scale(30,30);

function createMatriz(x,y){
    var matriz=[];
    while(y--){
        matriz.push(new Array(x).fill(0));
    }
    return matriz;
}



function drawGrid(matriz){
    var color;
    matriz.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value!==0){
                switch(value){
                    case 1: color="#6B0DFF"; break;
                    case 2: color="#00FFD4"; break;
                    case 3: color="#0001FF"; break;
                    case 4: color="#FF0500"; break;
                    case 5: color="#FF6F0B"; break;
                    case 6: color="#FFCD01"; break;
                    case 7: color="#2CFF01"; break;
                }
                ctx.strokeStyle="#000000"
                ctx.lineWidth = 1/50;
                ctx.strokeRect(x,y,1,1);
                ctx.fillStyle=color;
                ctx.fillRect(x,y,1,1);

            }
        })
    })

}
function outPoints(){
    ctxInf.clearRect(0, 12, 8, 8);
    ctxInf.font="0.9px verdana";
    ctxInf.textAlign="start";
    ctxInf.fillText("puntos: "+(points-1),2,14);
    ctxInf.fillText("Nivel: "+lvl,2,16);
}
function draw(){

    ctx.fillStyle="#000000";
    ctx.fillRect(0,0,10,20);

    drawGrid(gridColor);
    T.drawFigure();
}

function drawNextFigure(){
    Next.form.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value!==0){
 
                if(Next.form[0].length===4 || Next.form.length===4){
                    if(Next.form[0].length===4){
                        ctxInf.strokeStyle="#000000"
                        ctxInf.lineWidth = 1/20;
                        ctxInf.strokeRect(2+x,3+y,1,1);

                        ctxInf.fillStyle=Next.color;
                        ctxInf.fillRect(2+x,3+y,1,1);
                        console.log("hola");
                    }
                    else{
                        ctxInf.strokeStyle="#000000"
                        ctxInf.lineWidth = 1/20;
                        ctxInf.strokeRect(3+x,2+y,1,1);

                        ctxInf.fillStyle=Next.color;
                        ctxInf.fillRect(3+x,2+y,1,1);
                        console.log("hola");
                    }
                }
                else{
                    ctxInf.strokeStyle="#000000"
                    ctxInf.lineWidth = 1/20;
                    ctxInf.strokeRect(3+x,3+y,1,1);

                    ctxInf.fillStyle=Next.color;
                    ctxInf.fillRect(3+x,3+y,1,1);
                }
            }
        })
    })
}

function dropLineAsk(){
    var stack= new Array();
    var line=false;
    for(var i=0; i<grid.length;i++){
        for(var j=0; j<grid[0].length;j++){
            if(grid[i][j]===0){
                line=false;
                break;
            }
            else{
                line=true;
            }
        }
        if(line){
            stack.push(i);
        }
    }
    return stack;
}

function dropLine(stack){

    for(var i=0;i<stack.length;i++){
        grid[stack[i]].fill(0);
        gridColor[stack[i]].fill(0);
        points+=10;
        if((points-1)%100===0){
            lvl++;
            dropInterval-=100;
        }
        for(var y=stack[i]; y>0; y--){
            for(var x=0; x<10;x++){
                grid[y][x]=grid[y-1][x];
                gridColor[y][x]=gridColor[y-1][x];
            }
        }
    }
    for(var i=0;i<stack.length;i++){
        grid[i].fill(0);
        gridColor[i].fill(0);
    }
    console.log(grid);
}

function move(evento){
    if(!(T.colision("x",-1))){
        if(evento.key==="ArrowLeft"){
            T.left();
        }
    }
    if(!(T.colision("x",1))){
        if(evento.key==="ArrowRight"){
            T.right();
        }
    }
    if(!(T.colision("y",1))){
        if(evento.key==="ArrowDown"){
            T.down();
        }
    }
    if(!(T.canRote("l"))){
        if(evento.key==="a"){
           T.form=T.roteLeft();
        }
    }
    if(!T.canRote("r")){
        if(evento.key==="s"){
            T.form=T.roteRight();
        }
    }
    if(evento.key==="p"){
        alert("Has pausado el juego");
    }
}

function gameOver(){
    for(var i=0; i<grid[0].length;i++){
        if(grid[0][i]==1){
            return false;
        }
    }
    return true;
}

function saveGrid(figure){
    var x=figure.posX;
    var y=figure.posY;
        for(var i=0;i<figure.form.length;i++){
            for(var j=0;j<figure.form[0].length;j++){
                if(figure.form[i][j]==1){
                    grid[i+y][j+x]=figure.form[i][j];
                    gridColor[i+y][j+x]=figure.numero;
                    console.log(grid);
                    console.log(gridColor);
                }
            }
        }
}
function setFigure(){
    var ram=Math.floor(Math.random()*7);
    var T=figuras[ram];
    return T;
}

// lets go!!!

var T=setFigure();
var Next=setFigure();
ctxInf.fillStyle="#000000";
ctxInf.fillRect(1,1,6,6);
outPoints();
drawNextFigure();


function loop(time=0){
    if(gameOver()){
        const deltaTime = time-lastTime;
        lastTime=time;
        dropCounter+=deltaTime;
        if(dropCounter>dropInterval){
            if(T.colision("y",1)){
                saveGrid(T);
                var stack;
                stack=dropLineAsk();
                if(stack.length>0){
                    dropLine(stack);
                }
                T.reboot();
                T=Next;
                Next=setFigure();
                
                ctxInf.fillStyle="#000000";
                ctxInf.fillRect(1,1,6,6);
                outPoints();
                drawNextFigure();

            }
            else{
                T.down();
            }
            dropCounter=0;
        }
        draw();
    requestAnimationFrame(loop);
    }
    else{
        alert("GAME OVER!!!");
    }
}

loop();