class Figure{
    constructor(x,y,color,array,num){ //varia
        this.posX=x;
        this.posY=y;
        this.color=color;
        this.form=array;
        this.numero=num;
    }
    roteLeft(){
        if(!(this.form[0].length===2 && this.posX===8)){
            var array=[]
            var width=this.form.length;
            for(var i=0;i<this.form[0].length;i++){
                array.push(new Array(width).fill(0));
            }

            var y,x;
            x=array.length-1;
            for(var j=0;j<this.form[0].length;j++){
                y=0;
                for(var i=0;i<this.form.length;i++){
                    array[x][y]=this.form[i][j];
                    y++;
                }
                x--;
            }
            return array;
        }
    }
    roteRight(){
        if(!(this.form[0].length===2 && this.posX===8)){
            var array=[]
            var width=this.form.length;
            for(var i=0;i<this.form[0].length;i++){
                array.push(new Array(width).fill(0));
            }

            var y,x;
            y=0;
            for(var j=0;j<this.form[0].length;j++){
                x=this.form.length-1;
                for(var i=0;i<this.form.length;i++){
                    array[y][x]=this.form[i][j];
                    x--;
                }
                y++;
            }
            return array;
        }
    }


    canRote(rote){
        if(rote==="r"){
            var array=this.roteRight();
        }
        else if(rote==="l"){
            var array=this.roteLeft();
        }

        for(var i=0;i<array.length;i++){
            for(var j=0;j<array[0].length;j++){

                try{
                    if((i+this.posY)<20 && (j+this.posX)<10){
                        if(grid[i+this.posY][j+this.posX]+array[i][j]==2){
                            return true;
                        }
                    }
                    else{
                        return true;
                    }
                }
                catch(error){
                    return true;
                }

            }
        }
    }

    drawFigure(){
        this.form.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value!==0){

                    ctx.strokeStyle="#000000"
                    ctx.lineWidth = 1/50;
                    ctx.strokeRect(x+(this.posX), y+(this.posY),1,1);
                    
                    ctx.fillStyle=this.color;
                    ctx.fillRect(x+(this.posX), y+(this.posY),1,1);
                }
            })
        })
    }
    colision(pos,num){
        if(pos==="x"){
            for(var i=0;i<this.form.length;i++){
                for(var j=0;j<this.form[0].length;j++){
                    try{
                        if(grid[i+this.posY][j+this.posX+num]+this.form[i][j]==2){
                                return true;
                        }
                    }
                    catch(error){
                        return true;
                    }
                }
            }
        }
        else if(pos==="y"){
            for(var i=0;i<this.form.length;i++){
                for(var j=0;j<this.form[0].length;j++){
                    try{
                        if(grid[i+this.posY+num][j+this.posX]+this.form[i][j]==2){
                            return true;
                        }
                    }
                    catch(error){
                        return true;
                    }
                }
            }
        }

        return false;
    }

    down(){
        if(this.posY+this.form.length<20){
            this.posY++;
        }
    }
    left(){
        if(this.posX>0){
            this.posX--;
        }
    }
    
    reboot(){
        this.posX=4;
        this.posY=0;
        this.form=this.getFormOriginal();
    }
}

class Figure1 extends Figure{
    constructor(){ //varia
        super(4,0,"#6B0DFF",[[0,0,0][0,0,0]],1);
    }
    getFormOriginal(){ //varia
        var ram=Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        var forma;
        switch(ram){
            case 1:  forma=[[1,1,1],[0,1,0]];   break;
            case 2:  forma=[[1,0],[1,1],[1,0]];   break;
            case 3:  forma=[[0,1,0],[1,1,1]];  break;
            case 4:  forma=[[0,1],[1,1],[0,1]];  break;
        }
        return forma;
    }
    right(){
        if(this.form[0].length===2 && this.posX<8){
            this.posX++;
        }
        else if(this.form[0].length===3 && this.posX<7){
            this.posX++;
        }
    }
}
class Figure2 extends Figure{
    constructor(){ //varia
        super(4,0,"#00FFD4",[[0,0,0][0,0,0]],2);
    }
    getFormOriginal(){ //varia
        var ram=Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        var forma;
        switch(ram){
            case 1:  forma=[[1,1,1,1]];   break;
            case 2:  forma=[[1],[1],[1],[1]];   break;
        }
        return forma;
    }
    right(){
        if(this.form[0].length===1 && this.posX<9){
            this.posX++;
        }
        else if(this.form[0].length===4 && this.posX<6){
            this.posX++;
        }
    }
}

class Figure3 extends Figure{
    constructor(){ //varia
        super(4,0,"#0001FF",[[0,0,0][0,0,0]],3);
    }
    getFormOriginal(){ //varia
        var ram=Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        var forma;
        switch(ram){
            case 1:  forma=[[1,0,0],[1,1,1]];   break;
            case 2:  forma=[[0,1],[0,1],[1,1]];   break;
            case 3:  forma=[[1,1,1],[0,0,1]];   break;
            case 4:  forma=[[1,1],[1,0],[1,0]];   break;
        }
        return forma;
    }
    right(){
        if(this.form[0].length===2 && this.posX<8){
            this.posX++;
        }
        else if(this.form[0].length===3 && this.posX<7){
            this.posX++;
        }
    }
}

class Figure4 extends Figure{
    constructor(){ //varia
        super(4,0,"#FF0500",[[0,0,0][0,0,0]],4);
    }
    getFormOriginal(){ //varia
        var ram=Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        var forma;
        switch(ram){
            case 1:  forma=[[0,0,1],[1,1,1]];   break;
            case 2:  forma=[[1,1],[0,1],[0,1]];   break;
            case 3:  forma=[[1,1,1],[1,0,0]];   break;
            case 4:  forma=[[1,0],[1,0],[1,1]];   break;
        }
        return forma;
    }
    right(){
        if(this.form[0].length===2 && this.posX<8){
            this.posX++;
        }
        else if(this.form[0].length===3 && this.posX<7){
            this.posX++;
        }
    }
}

class Figure5 extends Figure{
    constructor(){ //varia
        super(4,0,"#FF6F0B",[[0,0,0][0,0,0]],5);
    }
    getFormOriginal(){ //varia

        var forma=[[1,1],[1,1]];
        return forma;
    }
    right(){
        if(this.form[0].length===2 && this.posX<8){
            this.posX++;
        }
    }
}

class Figure6 extends Figure{
    constructor(){ //varia
        super(4,0,"#FFCD01",[[0,0,0][0,0,0]],6);
    }
    getFormOriginal(){ //varia
        var ram=Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        var forma;
        switch(ram){
            case 1:  forma=[[0,1,1],[1,1,0]];   break;
            case 2:  forma=[[1,0],[1,1],[0,1]];   break;
        }
        return forma;
    }
    right(){
        if(this.form[0].length===2 && this.posX<8){
            this.posX++;
        }
        else if(this.form[0].length===3 && this.posX<7){
            this.posX++;
        }
    }
}

class Figure7 extends Figure{
    constructor(){ //varia
        super(4,0,"#2CFF01",[[0,0,0][0,0,0]],7);
    }
    getFormOriginal(){ //varia
        var ram=Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        var forma;
        switch(ram){
            case 1:  forma=[[1,1,0],[0,1,1]];   break;
            case 2:  forma=[[0,1],[1,1],[1,0]];   break;
        }
        return forma;
    }
    right(){
        if(this.form[0].length===2 && this.posX<8){
            this.posX++;
        }
        else if(this.form[0].length===3 && this.posX<7){
            this.posX++;
        }
    }
}
var figuras=new Array();
figuras.push(new Figure1());
figuras[0].form=figuras[0].getFormOriginal();
figuras.push(new Figure2());
figuras[1].form=figuras[1].getFormOriginal();
figuras.push(new Figure3());
figuras[2].form=figuras[2].getFormOriginal();
figuras.push(new Figure4());
figuras[3].form=figuras[3].getFormOriginal();
figuras.push(new Figure5());
figuras[4].form=figuras[4].getFormOriginal();
figuras.push(new Figure6());
figuras[5].form=figuras[5].getFormOriginal();
figuras.push(new Figure7());
figuras[6].form=figuras[6].getFormOriginal();
