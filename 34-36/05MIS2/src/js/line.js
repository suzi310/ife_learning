 var ctx = require('./app').ctx;
function LineChart() {
    this.data = [];
    // 定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    var height = 400;
    var width = 700;
    var axisHeigh = 500;
    var axisWidth = 700;
    // 定义好每一个数据点的直径，颜色，线的颜色，宽度    
    var pr = 5;
    var pColor = "#000";
    var lColor = "#f00";
    var lWidth = 3;
    // 定义好没两个数据点之间的横向间隔距离
    var gap = 50;
    // 绘制横轴及纵轴
    ctx.strokeStyle = lColor;
    ctx.lineWidth = lWidth;
    ctx.moveTo(0,0);
    ctx.lineTo(0,axisHeigh);
    ctx.lineTo(axisWidth,axisHeigh);
    ctx.stroke();

    //绘制图表
    this.draw = function(){
        //清空画布
        ctx.clearRect(5,0,width,axisHeigh-5);
        // 拿到折线图中的最大值Max
        var max = Math.max(...this.data);
        // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
        var rate = height/max;
        for(var i=0;i<this.data.length;i++) {
            // 计算将要绘制数据点的坐标
            var px = (i+1)*gap;
            var py = height-this.data[i]*rate+(axisHeigh-height);
            // 绘制数据点  
            ctx.beginPath();
            ctx.fillStyle = pColor;   
            ctx.arc(px,py,pr,0,2*Math.PI);
            ctx.fill();
            if (i!=0) {
                // 绘制这个数据点和上一个数据点的连线
                ctx.strokeStyle = lColor;
                ctx.lineWidth = 1;
                ctx.lineTo(lastPx,lastPy);
                ctx.stroke();
            }
            // 记录下当前数据点的数据用于下一个点时绘制连线
            lastPx = px;
            lastPy = py;
        } 
    }
    this.setData = function (data){
        this.data = data;
        this.draw();
    }
}
var linechart = new LineChart();
module.exports = {
    linechart: linechart
}