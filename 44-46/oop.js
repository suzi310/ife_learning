//餐厅类
var Restaurant = function(restaurant){
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
var Waiter = (function(id,name,wages){
	var singleWaiter = function(id,name,wages){
		Worker.call(this,id,name,wages);
		this.serviceOrder = function(dish){
			console.log("服务员"+this.name+"点菜："+dish.name);
			return dish;
		}
		this.serviceDish = function(dish){
			console.log("服务员"+this.name+"上菜："+dish.name);
			return dish;
		}
	};
	var instance;
	return {
		getInstance: function(id,name,wages){
			if(!instance){
				instance = new singleWaiter(id,name,wages);
			}
			return instance;			
		}
	};
})();
//厨师类
var Cook = (function(id,name,wages){
	var singleCook = function(id,name,wages){
		Worker.call(this,id,name,wages);
		this.cooking = function(dish){
			console.log("厨师"+this.name+"烹饪菜品:"+dish.name);
			return dish;
		}
	};
	var instance;
	return {
		getInstance: function(id,name,wages){
			if(!instance){
				instance = new singleCook(id,name,wages);
			}		
			return instance;	
		}
	};
})();
function getDish(){
	return menu[Math.floor(Math.random()*menu.length)];
}
function Customer(){
	this.order = function(){
		var dish = getDish();
		console.log("顾客点菜 "+ dish.name);
		return dish;
	}
	this.eating = function(dish){
		console.log("顾客吃 "+ dish.name);
		return true;
	}
}

function Dish(name,cost,price){
	this.name = name;
	this.cost = cost;
	this.price = price;
}

var menu = [
	new Dish("鸡",20,30),
	new Dish("鸭",25,38),
	new Dish("鱼",30,40),
	new Dish("蛋",15,30),
	new Dish("青菜",10,15)
];


var custList = [];
for(var i=0;i<4;i++){
	custList.push(new Customer());
}
function main(){
	while(custList.length!=0){
		var customer = custList.shift();
		var cook = new Cook.getInstance(2,"王师傅",5000);
		var waiter = new Waiter.getInstance(1,"小明",2300);
		var dish = customer.order();
		waiter.serviceOrder(dish);
		cook.cooking(dish);
		waiter.serviceDish(dish);
		customer.eating(dish);
		console.log("下一位顾客")
	}
}
main();