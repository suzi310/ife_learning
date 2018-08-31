function Restaurant(restaurant){
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

function Worker(id,name,wages){
	this.id = id;
	this.name = name;
	this.wages = wages;
	this.working = function(){
		console.log("working...");
	}
}
function Waiter(id,name,wages){
	Worker.call(this,id,name,wages);
	this.working =function(args){
		if(Array.isArray(args)){
			console.log("点菜");
		}else{
			console.log("上菜");
		}
	}
};

function Cook(id,name,wages){
	Worker.call(this,id,name,wages);
	this.working = function(dish){
		console.log("烹饪菜品:"+dish.name);
	}
};

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