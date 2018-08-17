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
