$(function () {
    var re=$('.re')
var ru=$('.ru')
var canvas=$('#c').get(0);
var ctx=canvas.getContext('2d');
var row=15;
var line=40;
var w=canvas.width;
var block={};
    var blank={};
var clock=$('.clock');
var rule=$('.rule');
var t=60;
off=40;
var start=$(".start")
var  man=$(".man")
    var ai=false;
    var com=$('.com')
    var rule=$('.rule')
    var li=$('.btn li')
    $(canvas).on('click',false);
    $(canvas).on('click',handlClick);
    start.on('click',function () {
        li.filter('.xuan').removeClass('xuan')
       animate(canvas,{top:0},2)
        start.toggleClass('xuan')
    })
    re.on('click',function () {
        li.filter('.xuan').removeClass('xuan')
        // location.reload()
        restart();
       re.toggleClass('xuan')
    })
    ru.on('click',function () {
        li.filter('.xuan').removeClass('xuan')
        rule.toggleClass('rules')
        ru.toggleClass('xuan')
    })
    com.on('click',function () {
        li.filter('.xuan').removeClass('xuan')
        ai=true;
        com.toggleClass('xuan')
        return ai;
        flag=false
    })
    man.on('click',function () {
        li.filter('.xuan').removeClass('xuan')
ai=false
        man.toggleClass('xuan')
    })
function time () {

    t--;

    clock.text(t);
    return t;

}
setInterval(time,1000);
    for (var i = 0; i <15 ; i++) {
        for(var j = 0;j < 15 ;j++){
            blank[w2k(i,j)]=true;
        }
    };
function o2k (position) {
    return position.x+'_'+position.y;
}
function w2k (x,y) {
    return x+'_'+y;
}
function k2o(position) {
    arr=position.split("_")
    return {x:parseInt(arr[0]),y:parseInt(arr[1])}
}
function drawText(position,text,color){
    ctx.save();
    ctx.font = "15px 微软雅黑";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    if (color==='black') {
        ctx.fillStyle='#fff';
    }else if(color==='white'){
        ctx.fillStyle='#000';
    }
    ctx.fillText(text, (position.x+0.5)*40, (position.y+0.5)*40);
    ctx.restore();
}
function restart(){
    ctx.clearRect(0,0,600,600);
    flag=true;
    blocks={};
    $(canvas).off('click').on('click',handlClick);
    draw();
}
// function AI() {
//     //		遍历空白位置
//     var max1 = -Infinity;
//     var max2 = -Infinity;
//     // var pos1;var pos2;
//     for (var i in blank) {
//         var score1 = check(k2o(i), 'black');
//         var score2 = check(k2o(i), 'white');
//         if (score1 > max1) {
//             max1 = score1;
//             pos1 = k2o(i);
//         }
//         if (score2 > max2) {
//             max2 = score2;
//             pos2 = k2o(i);
//         }
//     }
//     if (max2 > max1) {
//         return pos2;
//     } else {
//         return pos1;
//     }
// }

    function AI() {
        //		遍历空白位置
        var max1 = -Infinity;
        var max2 = -Infinity;
        var pos1;
        var pos2;
        // var pos1;var pos2;
        for (var i in blank) {
            var score1 = check(k2o(i), 'black');
            if (score1 > max1) {
                max1 = score1;
                pos1 = k2o(i);
            }
        }
        for (var i in blank) {
            var score2 = check(k2o(i), 'white');
            if (score2 > max2) {
                max2 = score2;
                pos2 = k2o(i);
            }
        }
        if (max2 > max1) {
            console.log(pos2)
            return pos2;
        } else {
            console.log(pos1)
            return pos1;
        }
    }

    rule.on('click',function(){

})

function review () {
    i=1
    for(var positions in block)
    {drawText(k2o(positions),i,block[positions])
        i++;
    }
}
function draw(){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.fillStyle = "rgba(31,81,151,0)";
    ctx.fillRect(0,0,600,600)
    ctx.closePath();
    ctx.stroke();
    for (var i = 0; i <row; i++) {


        ctx.beginPath();
        ctx.strokeStyle='black'
        ctx.moveTo(line/2+0.5,(line/2+0.5)+i*line);
        ctx.lineTo(w-(line/2-0.5),(line/2+0.5)+line*i)
        ctx.closePath();
        ctx.stroke();
    }
    for (var j = 0; j< row; j++) {
        ctx.beginPath();
        ctx.moveTo((line/2+0.5)+j*line,(line/2+0.5));
        ctx.lineTo((line/2+0.5)+j*line,w-(line/2-0.5));
        ctx.closePath();
        ctx.stroke();
    };

}
    function drawcircle() {


        ctx.beginPath();


        ctx.moveTo((line/2+0.5)+3*line,(line/2+0.5)+3*line)
        ctx.arc((line/2+0.5)+3*line,(line/2+0.5)+3*line,3,0,2*Math.PI)

        ctx.moveTo((line/2+0.5)+(15-4)*line,(line/2+0.5)+3*line)
        ctx.arc((line/2+0.5)+(15-4)*line,(line/2+0.5)+3*line,3,0,2*Math.PI)

        ctx.moveTo((line/2+0.5)+(15-4)*line,(line/2+0.5)+(15-4)*line)
        ctx.arc((line/2+0.5)+(15-4)*line,(line/2+0.5)+(15-4)*line,3,0,2*Math.PI)

        ctx.moveTo((line/2+0.5)+3*line,(line/2+0.5)+(15-4)*line)
        ctx.arc((line/2+0.5)+3*line,(line/2+0.5)+(15-4)*line,3,0,2*Math.PI)

        ctx.moveTo((line/2+0.5)+7*line,(line/2+0.5)+7*line)
        ctx.arc((line/2+0.5)+7*line,(line/2+0.5)+7*line,3,0,2*Math.PI)




        ctx.closePath();
        ctx.fill();
    }
    drawcircle();
function check (position,color) {
    var numrow=1;
    var numcol=1;
    var numleft=1;
    var numright=1;

    table={};
    for (var i in block) {
        if (block[i]===color) {
            table[i]=true;
        }
    }
    // heng
    tx=position.x
    ty=position.y
    while(table[w2k(tx+1,ty)]){
        numrow++;
        tx++;
    }

    tx=position.x
    ty=position.y
    while(table[w2k(tx-1,ty)]){
        numrow++;
        tx--;
    }

    tx=position.x
    ty=position.y
    while(table[w2k(tx,ty+1)]){
        numcol++;
        ty++;
    }

    tx=position.x
    ty=position.y
    while(table[w2k(tx,ty-1)]){
        numcol++;
        ty--;
    }

    tx=position.x
    ty=position.y
    while(table[w2k(tx-1,ty-1)]){
        numleft++;
        tx--;
        ty--;
    }

    tx=position.x
    ty=position.y
    while(table[w2k(tx+1,ty+1)]){
        numleft++;
        tx++;
        ty++;
    }


    tx=position.x
    ty=position.y
    while(table[w2k(tx+1,ty-1)]){
        numright++;
        tx++;
        ty--;
    }

    tx=position.x
    ty=position.y
    while(table[w2k(tx-1,ty)]){
        numright++;
        tx--;
        ty++;
    }


    return Math.max(numrow,numcol,numright,numleft)
}
function makechess (position,color) {
    ctx.beginPath();
    ctx.save();

    var a=position.x*off+0.5;
    var b=position.y*off+0.5;
    ctx.translate(a,b);

    if (color==='black') {

        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,a,b)
        }
        img.src = 'img/hei.png';
    }
    if (color==='white') {

        var img1 = new Image();
        img1.onload = function(){
            ctx.drawImage(img1,a,b)
        }
        img1.src = 'img/bai.png';

    }
    ctx.arc(0,0,15,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    block[o2k(position)]=color;


}
flag=true;
// $('canvas').on('click',function  (e)
    function handlClick(e){
    setInterval(time,1000);
    // $('canvas').offClick;
    x=Math.round((e.offsetX-line/2)/40)
    y=Math.round((e.offsetY-line/2)/40)

    position={x:x,y:y};
    if (block[o2k(position)]) {
        return;
    }else{
        if (ai) {

           makechess(position, 'black');
            if (check(position, 'black') >= 5) {

                if (confirm('是否生成棋谱？')) {
                    review();
                }
                return;
            }
            makechess(AI(), 'white')

            if (check(AI(), 'white') >= 6) {
                alert('白棋赢了');
                $(canvas).off('click');
                if (confirm('是否生成棋谱？')) {
                    review();
                }
                return;
            }
            return
        }
        if (flag) {

            color='white'
            makechess(position,color)


            if (check(position,'white')>=5) {
                alert('白棋赢了');
                $(canvas).off('click');

                if (confirm('生成棋谱么？')) {
                    review();
                    return;
                };
            };
        }else{
            color='black'
            makechess(position,color)


            if (check(position,color)>=5) {
                alert('黑棋赢了');
                $(canvas).off('click');
                if (confirm('生成棋谱么？')) {
                    review();
                    return;
                };
            };
        }


        flag=!flag;

        block[o2k(position)]=color;
    }
}
draw();
})