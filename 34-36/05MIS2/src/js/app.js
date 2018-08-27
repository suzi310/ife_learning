	var product = document.querySelector("#product-radio-wrapper");
	var region = document.querySelector("#region-radio-wrapper");
	var table = document.querySelector("#table-wrapper");
    var ctx = document.querySelector('#linechart').getContext('2d');
    var svg = document.querySelector('svg');

module.exports = {
	product: product,
	region: region,
	table: table,
	ctx: ctx,
	svg: svg
}