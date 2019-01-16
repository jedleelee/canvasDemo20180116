var pabo = document.getElementById('paintboard');
var context = pabo.getContext('2d');
//边为黄色内为red的矩形
context.strokeStyle = 'yellow'
context.strokeRect(10,10,100,100);
context.fillStyle = 'red';
context.fillRect(0,0,100,100);
//内为red三角形
context.fillStyle = 'red';
context.beginPath();
context.moveTo(140,140);
context.lineTo(200,140);
context.lineTo(200,200);
context.fill()
//圆形(内部默认填充黑色)
context.beginPath()
context.arc(100,100,10,0,2*Math.PI);
context.fill()
//圆形(描边默认黑色)
context.beginPath()
context.arc(50,50,10,0,2*Math.PI);
context.stroke()
//长200宽5的连接线
context.beginPath();
context.moveTo(0,0)//起点
context.lineWidth = 5
context.lineTo(200,0)//终点
context.stroke()
context.closePath()
//
function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,2*Math.PI);
    context.stroke()
}
//橡皮和画笔的转换
var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = !eraserEnabled
    if(eraserEnabled){
        eraser.textContent = '画笔'
    }else{
        eraser.textContent = '橡皮擦'
    }
}
//touch事件
canvas.ontouchstart = function(){
    cansole.log('开始摸了')

}
canvas.ontouchmove = function(){
    cansole.log('边摸变动')
    
}
canvas.ontouchend = function(){
    cansole.log('摸完了')
    
}
//brush/earser点击切换
eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
}