	var app = require('./app');
	var sourceData = require('./ife31data').sourceData;
	var renderTable = require('./table').renderTable;
	var product = app.product;
	var region = app.region;

	//生成一组CheckBox( CheckBox容器, CheckBox选项的参数对象或者数组 )
	function createCheckbox(container, data) {
	    //生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
	    var html = "<label><input type = 'checkbox' checkbox-type='all'>全选</label>";
	    for(var i=0;i<data.length;i++) {
	        //生成各个子选项checkbox的html，给一个自定义属性表示为子选项
	        html+= "<label><input type='checkbox' checkbox-type='single' value='"+data[i].value+"'>"+data[i].text+"</label>";
	    }
	    container.innerHTML = html;
	    //默认选中第一个
	    container.querySelector("[checkbox-type='single']").click();
	}

    //给容器做一个事件委托
    document.querySelectorAll(".checkbox-container").forEach(function(item) {
    	item.onclick = function(e){
    		e.stopPropagation();
    		// console.log(e.target);
    		if(e.target.nodeName.toUpperCase() == 'INPUT'){
    			if(e.target.type=="checkbox"){
		        	var type = e.target.getAttribute('checkbox-type');
		        	if(type=="all"){
		        		if(e.target.checked == true){
		        			item.childNodes.forEach(function(x){
		        				x.firstChild.checked = true;
		        			});
		        		}else{
		        			e.preventDefault();
		        		}
		        	}else{
		        		var num = document.querySelectorAll("#"+item.id+" input[checkbox-type='single']:checked").length;
		        		if(num==0){
		        			e.target.checked = true;
		        		}else if(num==3){
		        			document.querySelector("#"+item.id+" input[checkbox-type='all']").checked = true;
		        		}else{
		        			document.querySelector("#"+item.id+" input[checkbox-type='all']").checked = false;
		        		}
		        	}
		        }
				renderTable();
    		}

    	}
	});
	// 对象或数组自己根据喜好实现均可
	createCheckbox(region, [{
	    value: "华东",
	    text: "华东"
	}, {
	    value: "华南",
	    text: "华南"
	},{
		value:"华北",
		text:"华北"
	}]);

	createCheckbox(product, [{
	    value: "手机",
	    text: "手机"
	}, {
	    value: "笔记本",
	    text: "笔记本"
	}, {
	    value: "智能音箱",
	    text: "智能音箱"
	}]);

	
