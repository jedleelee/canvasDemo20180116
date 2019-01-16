var pabo = document.getElementById('paintboard');
var context = pabo.getContext('2d');


autoCanvasSize(pabo)

listenToMouse(pabo)

var eraserEnabled = false
eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
}






//圆加连线
function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,2*Math.PI);
    context.fill()
}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1,y1)//起点
    context.lineWidth = 5
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
function listenToMouse(){
    

    var using = false
    var lastPoint = {
        x:undefined, 
        y: undefined
    }
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