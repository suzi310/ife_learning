	var app = require('./app');
	var sourceData = require('./ife31data').sourceData;
	var linechart = require('./line').linechart;
	var bargraph = require('./bar').bargraph;
	var product = app.product;
	var region = app.region;
	var table = app.table;
	// var getCheckedArray = require('./checkbox').getCheckedArray;
	//获取已选的值的数组
	function getCheckedArray(container){
		var arr = [];
		var temp = container.querySelectorAll("input[checkbox-type='single']");
		for(var i=0;i<temp.length;i++){
			if(temp[i].checked == true)
			arr.push(temp[i].value) ;
		}
		return arr;
	}


	//获取数据
	function getData() {
		var list = [];
		for(var i =0;i<sourceData.length;i++){
			if(getCheckedArray(product).indexOf(sourceData[i].product)+1 && getCheckedArray(region).indexOf(sourceData[i].region)+1){
				list.push(sourceData[i]);
			}
		}
	    return list;
	}
	//渲染新的表格
	function renderTable() {
	    // 根据表单选项获取数据
	    var data = getData();
	    console.log(data);
	    // 渲染表格
	    table.innerHTML ="";
	    var t =document.createElement('table');
	    //渲染表头
	    var tr1 = document.createElement('tr');
	    //获取商品和地区选择了多少个
	    var pn = getCheckedArray(product).length;
	    var rn = getCheckedArray(region).length;
	    console.log("pn="+getCheckedArray(product));
	    console.log("rn="+getCheckedArray(region));
	    if(rn == 1 && pn != 1){
	    	//地区选择了一个，商品选择多个,地区作为第一列，商品作为第二列
	    	tr1.innerHTML = "<th>地区</th><th>商品</th>";
	    	for(var i=1;i<=12;i++){
	    	var text = document.createTextNode(i+"月");
	    	var th = document.createElement('th');
	    	th.appendChild(text);
	    	tr1.appendChild(th);
		    }
		    t.appendChild(tr1);
		    //渲染每行数据
		    for(var i=0;i<data.length;i++){
		    	var tr =document.createElement('tr');
		    	if(i==0){
		    		tr.innerHTML = "<td rowspan="+pn+">"+ data[i].region+"</td>"+"<td>"+ data[i].product+"</td>";
		    	}else{
		    		tr.innerHTML = "<td>"+ data[i].product+"</td>";
		    	}
		    	for(var j=0;j<12;j++){
			    	var td = document.createElement('td');
			    	td.innerText = data[i]["sale"][j];
			    	tr.appendChild(td);
		    	}
		    	t.appendChild(tr);
		    }
	    }else{
	    	//商品作为第一列，地区作为第二列
	    	tr1.innerHTML = "<th>商品</th><th>地区</th>";
		    for(var i=1;i<=12;i++){
		    	var text = document.createTextNode(i+"月");
		    	var th = document.createElement('th');
		    	th.appendChild(text);
		    	tr1.appendChild(th);
			    }
			t.appendChild(tr1);
	    	if(pn==1){
	    		if(rn == 1){
	    			//当商品和地区都只选择一个的情况下
				    //渲染每行数据
				    for(var i=0;i<data.length;i++){
				    	var tr =document.createElement('tr');
				    	tr.innerHTML = "<td>"+ data[i].product+"</td>"+"<td>"+ data[i].region+"</td>";
				    	for(var j=0;j<12;j++){
					    	var td = document.createElement('td');
					    	td.innerText = data[i]["sale"][j];
					    	tr.appendChild(td);
				    	}
				    	t.appendChild(tr);
		    		}
	    		}else{
	    			//当商品选择了一个，地区选择了多个的时候，并且把商品这一列的单元格做一个合并，只保留一个商品名称
				    //渲染每行数据
				    for(var i=0;i<data.length;i++){
				    	var tr =document.createElement('tr');
				    	if(i==0){
				    		tr.innerHTML = "<td rowspan="+rn+">"+ data[i].product+"</td>"+"<td>"+ data[i].region+"</td>";
				    	}else{
				    		tr.innerHTML = "<td>"+ data[i].region+"</td>";
				    	}
				    	for(var j=0;j<12;j++){
					    	var td = document.createElement('td');
					    	td.innerText = data[i]["sale"][j];
					    	tr.appendChild(td);
				    	}
				    	t.appendChild(tr);
	    			}
	    		}
	    	}else{
	    		//当商品和地区都选择了多于一个的情况下，商品列对同样的商品单元格进行合并
				    //渲染每行数据
				    for(var i=0;i<data.length;i++){
				    	var tr =document.createElement('tr');
				    	if(i%rn==0){
				    		tr.innerHTML = "<td rowspan="+rn+">"+ data[i].product+"</td>"+"<td>"+ data[i].region+"</td>";
				    	}else{
				    		tr.innerHTML = "<td>"+ data[i].region+"</td>";
				    	}
				    	for(var j=0;j<12;j++){
					    	var td = document.createElement('td');
					    	td.innerText = data[i]["sale"][j];
					    	tr.appendChild(td);
				    	}
				    	t.appendChild(tr);
	    			}
	    		}
	    	}
	    table.appendChild(t);
	}
// var linechart = new LineChart();
table.onmouseover = function(e){
	if(e.target.nodeName.toUpperCase() == 'TD'){
		var data = [];
		var tds = e.target.parentElement.querySelectorAll('td');
		for (var i = tds.length - 1; data.length<12; i--) {
			data.unshift(tds[i].innerHTML);
		}
		linechart.setData(data);
		bargraph.setData(data);
	}
}
module.exports = {
	renderTable:renderTable
}