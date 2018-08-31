//餐厅类
var singleRestaurant = function(restaurant){
	this.cash = restaurant.cash;
	this.seats = restaurant.seats;
	this.staff = restaurant.staff;
	this.hire = function(worker){
		this.staff.push(worker);
	};
	this.fire = function(worker){
		var index = this.staff.indexOf(worker);
		this.staff.splice(index,1);
	};
}
singleRestaurant.getInstance = (function(restaurant){
	var instance;
	return function(restaurant){
		if(!instance){
			instance = new singleRestaurant(restaurant);
		}
		return instance;
	}
})();
//职员类
var Worker =function(id,name,wages){
	this.id = id;
	this.name = name;
	this.wages = wages;
	this.working = function(){
		console.log("working...");
	}
}
//服务员类
var singleWaiter = function(id,name,wages){
	Worker.call(this,id,name,wages);
	this.working =function(args){
		if(Array.isArray(args)){
			console.log("点菜");
		}else{
			console.log("上菜");
		}
	}
};
singleWaiter.getInstance = (function(id,name,wages){
	var instance;
	if(!instance){
		instance = new singleWaiter(id,name,wages);
	}
	return instance;
})();
var singleCook = function(id,name,wages){
	Worker.call(this,id,name,wages);
	this.working = function(dish){
		console.log("烹饪菜品:"+dish.name);
	}
};
singleCook.getInstance = (function(id,name,wages){
	var instance;
	if(!instance){
		instance = new singleCook(id,name,wages);
	}
	return instance;
})();
function Customer(){
	this.order = function(dish){
		console.log("点菜 "+ dish.name);
	}
	this.eating = function(){
		console.log("吃 "+ dish.name);
	}
}

function Dish(name,cost,price){
	this.name = name;
	this.cost = cost;
	this.price = price;
}