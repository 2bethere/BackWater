var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];
    

var bwConfig = new Object();
bwConfig.xResolution = 60;
bwConfig.yResolution = 40;

var bgStore = new Object();

//
function drawBackground(){
	var svg = d3.select("svg");
	//
	var c = 0;
	var dataset = new Array();
	windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;

	for(y = 0; y < bwConfig.yResolution; y++)
	{
		for(x = 0; x < bwConfig.xResolution; x++)
		{
			dataset[c] = Math.random() < 0.5;
			c++;
		}
	}
	//
	bgStore.e = svg.selectAll("path")
    .data(dataset)
    .enter()
    .append("path");
    var space = Math.round(windowWidth / bwConfig.xResolution) ;
    bgStore.e.attr("transform", function(d, i) { 
    	return "translate(" + ((i % bwConfig.xResolution) * space ) + "," + (Math.floor(i / bwConfig.xResolution) * space + 20) + ")"; 
    })
    .attr("d", d3.svg.symbol().type("cross").size(64))
    .attr("type", "cross")
    .attr("fill", function(d, i) {
				   		if (d)
				   		{
				   			return "#0038A8";
				   		}else{
				   			return "#EEEEEE";
				   		}
				   })
    .attr("opacity", 0)
    ;
  	var transition = svg.transition().duration(1000),
        delay = function(d, i) { return i ; };

    transition.selectAll("path")
        .delay(delay)
        .attr("opacity", 100)
        .attr("transform", function(d, i) { 
    		return "translate(" + ((i % bwConfig.xResolution) * space ) + "," + (Math.floor(i / bwConfig.xResolution) * space + 20) + ")"; 
    	});

    svg.on("click", function(){
    	var dataset = new Array();
    	var svg = d3.select("svg");
	
		for(y = 0; y < bwConfig.yResolution; y++)
		{
			for(x = 0; x < bwConfig.xResolution; x++)
			{
				dataset[c] = Math.random() < 0.5;
				c++;
			}
		}

		svg.selectAll("path")
	    .data(dataset)
	    .enter()
		 attr("fill", function(d, i) {
				   		if (d)
				   		{
				   			return "#0038A8";
				   		}else{
				   			return "#EEEEEE";
				   		}
				   });
		 console.log("Updated");
	});

/*

	svg.on("mousemove", function(){
		 bgStore.e.attr("transform", function(d, i) { 
    			//return "scale("+  +","+ +")"
    		});
	});

	  
    
    bgStore.e.attr("cx", function(d, i) {
						return ((i % 30) * space + 20);
					})
				   .attr("cy",  function(d, i) {
				   		return ( Math.floor(i / 30) * space + 20);
				   })
				   .attr("r", 10)
				   .attr("fill", function(d, i) {
				   		if (d)
				   		{
				   			return "#0038A8";
				   		}else{
				   			return "#EEEEEE";
				   		}
				   });
		*/
}

$( document ).ready(function() {
   
    //var svg = d3.select("svg");

    updateWindow();
 	$(".mainnav li").click(function(event){

    	event.preventDefault();

		$("#boxoverlay").load(event.target.href); 

    	return false; //for good measure
	});
    //drawBackground();
});

function updateWindow(){
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	var svg = d3.select("svg");
    svg.attr("width", x).attr("height", y);
}
window.onresize = updateWindow;