	var product = document.querySelector("#product-radio-wrapper");
	var region = document.querySelector("#region-radio-wrapper");
	var table = document.querySelector("#table-wrapper");
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
