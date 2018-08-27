 var svg = require("./app").svg;
function BarGraph() {
    this.data = [];
    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    var height = 400;
    var width = 700;
    var axisHeight = 500;
    var axisWidth = 700;
    // 定义好每一个柱子的宽度及柱子的间隔宽度
    var barWidth = 30;
    var gapWidth = 20;
    // 定义好柱子颜色，轴的颜色
    var barColor = 'red';
    var axisColor = 'black';


    this.draw = function(){
        svg.innerHTML = '';
        // 绘制横轴及纵轴
        var axistxt = document.createElementNS( "http://www.w3.org/2000/svg", "polyline" );
        axistxt.setAttribute("points", '0 0, 0 '+axisHeight+','+axisWidth+' '+axisHeight);
        axistxt.setAttribute("stroke-width", "3");
        axistxt.setAttribute("stroke", axisColor);
        axistxt.setAttribute("fill", "transparent");
        svg.appendChild(axistxt);
        // 拿到柱状图中的最大值Max
        var max = Math.max(...this.data);//es6
        // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
        var rate = height/max;

        for(var i =0;i<this.data.length;i++) {
            // 计算将要绘制柱子的高度和位置
            var barHeight = this.data[i] * rate;
            var barX = i*(barWidth+gapWidth)+barWidth;
            var barY = height - barHeight + (axisHeight-height);
            // 绘制每一个柱子
            var rect = document.createElementNS( "http://www.w3.org/2000/svg", "rect" );
            rect.setAttribute("x", barX);
            rect.setAttribute("y", barY);
            rect.setAttribute( "width", barWidth );
            rect.setAttribute( "height", barHeight );
            rect.setAttribute( "fill", barColor );
            svg.appendChild( rect );
        }    

    }
    this.setData= function(data){
        this.data = data;
        this.draw();
    }
}
var bargraph = new BarGraph();
module.exports = {
    bargraph: bargraph
}