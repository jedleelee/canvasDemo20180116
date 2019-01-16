var pabo = document.getElementById('paintboard');
var context = pabo.getContext('2d');
var lineWidth = 5

autoCanvasSize(pabo)

listenToUser(pabo)

var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}

brush.onclick = function(){
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}
//刷新
clear.onclick = function(){
    context.clearRect(0, 0, pabo.width, pabo.height);
}
//download
download.onclick = function(){
    var url = pabo.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '你的丑画'
    a.target = '_blank'
    a.click()
}
//颜色
red.onclick = function () {
    context.fillStyle = "green";
    context.strokeStyle = "red";
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
green.onclick = function () {
    context.fillStyle = "green";
    context.strokeStyle = "green";
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
};
blue.onclick = function () {
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
};
black.onclick = function () {
    context.fillStyle = "black";
    context.strokeStyle = "black";
    black.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
};

//粗细线
thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 10
}






//圆加连线
function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,2*Math.PI);
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)//起点
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)//终点
    context.stroke()
    context.closePath()
}


//设定画板高度
function autoCanvasSize(){
    setCanvasSize()

    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
    
        pabo.width = pageWidth
        pabo.height = pageHeight
    }
}




//监听键盘动作
function listenToUser(){
    

    var using = false
    var lastPoint = {
        x:undefined, 
        y: undefined
    }
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        pabo.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            
            if(eraserEnabled){
                context.clearRect(x - 5,y - 5,10,10)
            }else{
                
                lastPoint = {"x": x,"y":y}
            }
        
        }
        pabo.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
        
            if(!using){
                return
            }
            if(eraserEnabled){
                context.clearRect(x - 5,y - 5,10,10)
            }else{
                if(using){
                    var newPoint = {
                        "x": x,
                        "y":y
                    } 
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x,newPoint.y)
                    lastPoint = newPoint
                }
            }
            
        }
        pabo.ontouchend = function(aaa){
            using = false
            
        }
    }else{
        //mouse设备
        pabo.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            
            if(eraserEnabled){
                context.clearRect(x - 5,y - 5,10,10)
            }else{
                
                lastPoint = {"x": x,"y":y}
            }
             
        }
        pabo.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
        
            if(!using){
                return
            }
            if(eraserEnabled){
                context.clearRect(x - 5,y - 5,10,10)
            }else{
                if(using){
                    var newPoint = {
                        "x": x,
                        "y":y
                    } 
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x,newPoint.y)
                    lastPoint = newPoint
                }
            }
        }
        pabo.onmouseup = function(aaa){
            using = false
        }       
    }

}