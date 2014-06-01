function initialize(){geocoder=new google.maps.Geocoder;var t=[{featureType:"landscape.man_made",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",stylers:[{color:"#fcfcfc"}]},{},{featureType:"road",stylers:[{saturation:-100}]},{featureType:"water",stylers:[{color:"#daedff"}]},{elementType:"labels",stylers:[{lightness:26}]},{}],e=new google.maps.LatLng(-25.363882,131.044922),n={zoom:4,disableDefaultUI:!0,center:e,styles:t};map=new google.maps.Map(document.getElementById("map-canvas"),n),marker=new google.maps.Marker({map:map,anchorPoint:new google.maps.Point(0,0)}),marker.setIcon({url:"/assets/marker-40290499fb621630f92ed62592323df7.png",size:new google.maps.Size(30,26),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(15,26),scaledSize:new google.maps.Size(30,26),animation:google.maps.Animation.DROP})}function loadScript(){var t=document.createElement("script");t.type="text/javascript",t.src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDQLZ-U3WnaDM6IoWVrM90P9sFswn2xbVg&sensor=false&libraries=places&callback=initialize",document.body.appendChild(t)}function setupBox(){width=window.innerWidth,height=window.innerHeight,$(".box").height(height),$(".box").width(width),$(".boxpanel").height(height*$(".box").length)}function moveBoxToIndex(t){$("#closebutton").fadeOut(),$("#picturebox").fadeOut(400,function(){$("#picturebox").html("")}),height=window.innerHeight,$(".boxpanel").animate({top:-t*height},1e3);var e=$(".menubuttoncontainer").offset(),n=$(".menubutton").first().outerHeight();$(".menuhighlight").animate({top:e.top+n*t},1e3),$(".menubutton").children(".menubuttonicon").removeClass("menubuttonblue0 menubuttonblue1 menubuttonblue2 menubuttonblue3 menubuttonblue4"),$($(".menubutton")[t]).children(".menubuttonicon").addClass("menubuttonblue"+t),$(".menubuttontext").removeClass("menubuttontextactive"),$($(".menubutton")[t]).children(".menubuttontext").addClass("menubuttontextactive")}function setupFormsAndLinks(){$(document).on("click","#boxoverlay a[href]",function(t){return $("#boxoverlay").load(t.target.href,function(){console.log("new page loaded")}),!1}),$(document).on("click",".imagethumb",function(t){var e=$("#boxoverlay").offset(),n=$("<img />").attr("src",t.target.parentNode.href).load(function(){if(this.complete&&"undefined"!=typeof this.naturalWidth&&0!=this.naturalWidth){$("#picturebox").hide(),$("#picturebox").html('<span class="helper"></span>'),$("#boxoverlay").offset().left>window.innerWidth/2?($("#picturebox").css({top:80,left:180}),$("#picturebox").innerWidth(window.innerWidth-1e3)):($("#picturebox").css({top:80,left:e.left+540}),$("#picturebox").innerWidth(window.innerWidth-e.left-600)),$("#picturebox").innerHeight(window.innerHeight-120),$("#picturebox").append(n),$("#picturebox").fadeIn(),$("#closebutton").hide();var t=$("#picturebox img").offset();console.log(t),$("#closebutton").css({top:t.top-10,left:t.left-10}),$("#closebutton").fadeIn()}else alert("broken image!")});return!1}),$(document).on("click","#closebutton",function(){$("#closebutton").fadeOut(),$("#picturebox").fadeOut(400,function(){$("#picturebox").html("")})}),$(document).on("click",".mypostrow",function(t){var e=$(t.target).closest(".mypostrow").children(".datacontainer").html();loadPostUrl(e),history.pushState(stateObj,"post "+e,"/l/"+e)}),$(document).on("click",".requestkitbutton",function(){$(".requestkitform").slideToggle()}),$(document).on("click",".kitsubmit",function(){$(".requestkitform").slideToggle()})}function setupNavLinkClick(){$(".menubutton").click(function(t){var e=$(".menubutton").index($(t.target).closest($(".menubutton")));moveBoxToIndex(e)}),$(".navmid li").click(function(t){t.preventDefault(),url=t.target.href,url||(url=$(t.target).children(":first")[0].href);var e=$(t.target).closest("li");$.ajax(url).done(function(t){$("#boxoverlay").html(t),$("#boxoverlay").slideDown("slow"),console.log("new page loaded, applying fullpage scroll"),resizeBoxOverlay(),$("#fullpage").fullpage({verticalCentered:!1,navigation:!1,normalScrollElements:"#map-canvas, .scrollpanel",scrollOverflow:!0,afterLoad:renderPostGraph,afterRender:renderPostGraph}),setupLocationComplete(),renderPostGraph(null,0)}).fail(function(){$("#boxoverlay").load("/users/sign_in"),$("#boxoverlay").slideDown("slow")}).always(function(){$("#boxoverlay").css({top:35,left:e.offset().left-140})})})}function loadPostUrl(t){var e="/posts/list/"+t;$.ajax(e).done(function(t){$("#boxoverlay").html(t),$("#boxoverlay").slideDown("slow"),console.log("new page loaded, applying fullpage scroll"),resizeBoxOverlay(),$("#fullpage").fullpage({verticalCentered:!1,navigation:!0,normalScrollElements:"#map-canvas, .scrollpanel",scrollOverflow:!0,afterLoad:renderPostGraph,afterRender:renderPostGraph}),setupLocationComplete(),renderPostGraph(null,0)}).fail(function(){$("#boxoverlay").load("/users/sign_in"),$("#boxoverlay").slideDown("slow")}).always(function(){$("#boxoverlay").css({top:35,left:$("nav").find("li").last().offset().left-140})})}function resizeBoxOverlay(){$("#boxoverlay").innerHeight(window.innerHeight-35)}function offsetCenter(t,e,n){map.setZoom(6);var a=Math.pow(2,map.getZoom()),r=(new google.maps.LatLng(map.getBounds().getNorthEast().lat(),map.getBounds().getSouthWest().lng()),map.getProjection().fromLatLngToPoint(t)),o=new google.maps.Point(e/a||0,n/a||0),i=new google.maps.Point(r.x-o.x,r.y+o.y),l=map.getProjection().fromPointToLatLng(i);map.panTo(l),marker.setPosition(t)}function setupLocationComplete(){if($("#post_location").length){var t=document.getElementById("post_location"),e=new google.maps.places.Autocomplete(t);e.bindTo("bounds",map),google.maps.event.addListener(e,"place_changed",function(){marker.setVisible(!1);var t=e.getPlace();if(t.geometry){t.geometry.viewport?map.fitBounds(t.geometry.viewport):(map.setCenter(t.geometry.location),map.setZoom(14)),offsetCenter(t.geometry.location,400),marker.setPosition(t.geometry.location),marker.setVisible(!0);var n="";t.address_components&&(n=[t.address_components[0]&&t.address_components[0].short_name||"",t.address_components[1]&&t.address_components[1].short_name||"",t.address_components[2]&&t.address_components[2].short_name||""].join(" "))}})}}function renderPostGraph(t,e){$("#closebutton").hide(),$("#picturebox").fadeOut(1e3,function(){$("#picturebox").html("")}),console.log("Render graph");var n=$(".section")[e-1],a=$(n).find(".datacontainer").html();if(!a){if(a=$(".datacontainer").first().html(),console.log("Data_element:"),console.log(a),!a)return!1;n=$(".datacontainer").parent()}try{var r=JSON.parse(a),o=$(n).find("#grapharea");$(o).html("");var i=(d3.scale.linear().domain([0,360]).range([0,2*Math.PI]),d3.select(o[0])),l=new Array;switch(r.cholera_o1){case 2:l.push({color:"#2B3990"});break;case 1:l.push({color:"#EEEEEE"});break;default:l.push({color:"#EEEEEE"})}switch(r.cholera_o139){case 2:l.push({color:"#2B3990"});break;case 1:l.push({color:"#EEEEEE"});break;default:l.push({color:"#EEEEEE"})}console.log("plot data");var s=i.append("g"),c=d3.svg.arc(),u=d3.layout.pie().startAngle(-120/180*Math.PI).endAngle(120/180*Math.PI).value(function(){return 1}),d=s.selectAll().append("g");if(d.data(u(l)).enter().append("path").style("fill",function(t){return t.data.color}).attr("transform","translate(120,80)").transition().delay(function(t,e){return 600*e}).duration(600).ease("linear").attrTween("d",function(t){var e=d3.interpolate(t.startAngle+0,t.endAngle);return function(n){return t.endAngle=e(n),c(t)}}),console.log("Append image"),s.selectAll("image").data([0]).enter().append("image").attr("xlink:href","/assets/cholera-8e74f985caaad8af3e7b7c9aab645a33.png").attr("x","90").attr("y","100").attr("width","60").attr("height","60"),"0"==r.cholera_o1&&"0"==r.cholera_o139)var p="SAFE";else if(r.cholera_o1>1||r.cholera_o139>1)var p="RISK";else var p="SAFE";s.append("text").attr("x","98").attr("y","85").style("font-size","12pt").text(p),l=void 0,l=new Array;var f=r.nitrite;l.push({color:"#F1E5EA"}),f>5&&l.push({color:"#F3DDE7"}),f>4&&l.push({color:"#F4CADF"}),f>3&&l.push({color:"#E6AACD"}),f>2&&l.push({color:"#DC85B7"}),f>1&&l.push({color:"#CD539E"});for(var m=6-f;m>0;m--)l.push({color:"#EEEEEE"});var g=i.append("g"),c=d3.svg.arc(),u=d3.layout.pie().startAngle(-120/180*Math.PI).endAngle(120/180*Math.PI).value(function(){return 1}),d=g.selectAll().data(u(l)).enter().append("g");if(d.append("path").style("fill",function(t){return t.data.color}).attr("transform","translate(350,80)").transition().delay(function(t,e){return 200*e}).duration(200).ease("linear").attrTween("d",function(t){var e=d3.interpolate(t.startAngle+0,t.endAngle);return function(n){return t.endAngle=e(n),c(t)}}),console.log("Append image"),g.selectAll("image").data([0]).enter().append("image").attr("xlink:href","/assets/nitrite-62bd1eb8a3fa8837a197adcc6217be02.png").attr("x","321").attr("y","100").attr("width","60").attr("height","60"),r.nitrite>=3)var p="RISK";else var p="SAFE";g.append("text").attr("x","330").attr("y","85").style("font-size","12pt").text(p),g.append("text").attr("x","334").attr("y","50").style("font-size","8pt").text(r.nitrite+" ppm");var l=new Array;switch(r.coliform){case 2:l.push({color:"#F6ED7F"}),l.push({color:"#EEEEEE"});break;case 1:l.push({color:"#EEEEEE"}),l.push({color:"#4CC1BC"});break;default:l.push({color:"#EEEEEE"}),l.push({color:"#EEEEEE"})}console.log("plot data");var h=i.append("g"),c=d3.svg.arc(),u=d3.layout.pie().startAngle(-120/180*Math.PI).endAngle(120/180*Math.PI).value(function(){return 1}),d=s.selectAll().data(u(l)).enter().append("g");if(d.append("path").style("fill",function(t){return t.data.color}).attr("transform","translate(120,250)").transition().delay(function(t,e){return 600*e}).duration(600).ease("linear").attrTween("d",function(t){var e=d3.interpolate(t.startAngle+0,t.endAngle);return function(n){return t.endAngle=e(n),c(t)}}),console.log("Append image"),h.selectAll("image").data([0]).enter().append("image").attr("xlink:href","/assets/coliform-1485b2f35a9aa11c4f18892ffa9cacc9.png").attr("x","90").attr("y","270").attr("width","60").attr("height","60"),0!=r.coliform)var p="RISK";else var p="SAFE";h.append("text").attr("x","100").attr("y","255").style("font-size","12pt").text(p),l=void 0,l=new Array;var f=r.arsenic;l.push({color:"#F2E9AC"}),f>5&&l.push({color:"#EED772"}),f>4&&l.push({color:"#E8BC22"}),f>3&&l.push({color:"#E89427"}),f>2&&l.push({color:"#CD6631"}),f>1&&l.push({color:"#793C2C"});for(var m=6-f;m>0;m--)l.push({color:"#EEEEEE"});var y=i.append("g"),c=d3.svg.arc().innerRadius(50).outerRadius(70),u=d3.layout.pie().startAngle(-120/180*Math.PI).endAngle(120/180*Math.PI).value(function(){return 1}),d=y.selectAll().data(u(l)).enter().append("g");if(d.append("path").style("fill",function(t){return t.data.color}).attr("transform","translate(350,250)").transition().delay(function(t,e){return 200*e}).duration(200).ease("linear").attrTween("d",function(t){var e=d3.interpolate(t.startAngle+0,t.endAngle);return function(n){return t.endAngle=e(n),c(t)}}),console.log("Append image"),y.selectAll("image").data([0]).enter().append("image").attr("xlink:href","/assets/arsenic-f6d3445881fa3233ba65665da2d21fd4.png").attr("x","322").attr("y","270").attr("width","60").attr("height","60"),r.arsenic>=2)var p="RISK";else var p="SAFE";y.append("text").attr("x","330").attr("y","255").style("font-size","12pt").text(p),y.append("text").attr("x","334").attr("y","220").style("font-size","8pt").text(r.arsenic+" ppm");var v=i.append("g"),x=410,b=120,w=d3.scale.linear().domain([0,6]).range([0,x]),E=d3.scale.linear().domain([0,10]).range([b,0]),k=d3.svg.line().x(function(t,e){return w(e)}).y(function(t){return E(t)}).interpolate("basis");v.attr("transform","translate(30,340)");var A=d3.svg.axis().scale(E).ticks(4).orient("right").tickFormat(function(t){return 10===t?t+" million people":t});v.append("g").attr("class","y axis").attr("transform","translate(0,0)").call(A);var P=d3.svg.axis().scale(w).ticks(6).orient("bottom").tickFormat(function(t){return 0===t?"Risk scale":t});v.append("g").attr("class","x axis").attr("transform","translate(0,"+b+")").call(P),l=[[3,4,6,7,5,2,1],[2,2,3,4,7,6,4],[2,8,6,4,3,2,1],[2,4,6,8,6,4,1]];for(var B=["#2B3990","#CD539E","#47C4BE","#E8942A"],m=0;m<l.length;m++){var C=v.append("g"),T=C.append("path").attr("d",k(l[m])).style("stroke-width","2").style("stroke",B[m]).style("fill","none"),I=T.node().getTotalLength();T.attr("stroke-dasharray",I+" "+I).attr("stroke-dashoffset",I).transition().delay(500*m).duration(1e3).ease("cubic-out").attr("stroke-dashoffset",0)}var M=r.location;geocoder.geocode({address:M},function(t,e){e==google.maps.GeocoderStatus.OK?(console.log("Geocode"),offsetCenter(t[0].geometry.location,400)):console.log("Geocode was not successful for the following reason: "+e)})}catch(S){console.log(S)}}function resizeVideo(){var t=$("#boxkit").width(),e=$("#boxkit").height();e>t/1280*720?$("#kitvideo").height(e):$("#kitvideo").width(t-140)}function setupUI(){$("#slider").slider({value:1,min:0,max:10,step:1,slide:function(t,e){$("#amount").html(e.value)}}),$("#amount").html($("#slider").slider("value"))}function setupReel(){function t(){function t(t){n.each(function(e){var n=d3.select(this);p.domain([0,e.maxPrice]),n.select("path").attr("d",function(e){return E(e.values.slice(0,t+1))}),n.selectAll("circle, text").data(function(e){return[e.values[t],e.values[t]]}).attr("transform",function(t){return"translate("+d(t.date)+","+p(t.price)+")"})})}d=d3.time.scale().range([0,h-60]),p=d3.scale.linear().range([y/4-20,0]),d.domain([d3.min(m,function(t){return t.values[0].date}),d3.max(m,function(t){return t.values[t.values.length-1].date})]);var n=w.selectAll(".symbol").attr("transform",function(t,e){return"translate(0,"+(e*y/4+10)+")"});n.each(function(t){var e=d3.select(this);e.append("path").style("stroke","#000").attr("class","line").style("fill","none"),e.append("circle").attr("r",5).style("fill",function(t){return b(t.key)}).style("stroke","#000").style("stroke-width","2px"),e.append("text").attr("x",12).attr("dy",".31em").text(t.key)});var a=1,r=m[0].values.length;d3.timer(function(){return t(a),(a+=2)>=r-1?(t(r-1),setTimeout(e,500),!0):void 0})}function e(){w.insert("defs",".symbol").append("clipPath").attr("id","clip").append("rect").attr("width",h).attr("height",y/4-20);var t=d3.scale.ordinal().range(["#c6dbef","#9ecae1","#6baed6"]),e=w.selectAll(".symbol").attr("clip-path","url(#clip)");k.y0(y/4-20),e.select("circle").transition().duration(v).attr("transform",function(){return"translate("+(h-60)+","+-y/4+")"}).remove(),e.select("text").transition().duration(v).attr("transform",function(){return"translate("+(h-60)+","+(y/4-20)+")"}).attr("dy","0em"),e.each(function(e){p.domain([0,e.maxPrice]),d3.select(this).selectAll(".area").data(d3.range(3)).enter().insert("path",".line").attr("class","area").attr("transform",function(t){return"translate(0,"+t*(y/4-20)+")"}).attr("d",k(e.values)).style("fill",function(e,n){return t(n)}).style("fill-opacity",1e-6),p.domain([0,e.maxPrice/3]),d3.select(this).selectAll(".line").transition().duration(v).attr("d",E(e.values)).style("stroke-opacity",1e-6),d3.select(this).selectAll(".area").transition().duration(v).style("fill-opacity",1).attr("d",k(e.values)).each("end",function(){d3.select(this).style("fill-opacity",null)})}),setTimeout(n,v+x)}function n(){var t=w.selectAll(".symbol");$.y(y/4-21),t.select(".line").attr("d",function(t){return $(t.values)}),t.each(function(t){p.domain([0,t.maxPrice]),d3.select(this).select(".line").transition().duration(v).style("stroke-opacity",1).each("end",function(){d3.select(this).style("stroke-opacity",null)}),d3.select(this).selectAll(".area").filter(function(t,e){return e}).transition().duration(v).style("fill-opacity",1e-6).attr("d",k(t.values)).remove(),d3.select(this).selectAll(".area").filter(function(t,e){return!e}).transition().duration(v).style("fill",b(t.key)).attr("d",k(t.values))}),w.select("defs").transition().duration(v).remove(),t.transition().duration(v).each("end",function(){d3.select(this).attr("clip-path",null)}),setTimeout(a,v+x)}function a(){var t=d3.layout.stack().values(function(t){return t.values}).x(function(t){return t.date}).y(function(t){return t.price}).out(function(t,e){t.price0=e}).order("reverse");t(m),p.domain([0,d3.max(m[0].values.map(function(t){return t.price+t.price0}))]).range([y,0]),E.y(function(t){return p(t.price0)}),k.y0(function(t){return p(t.price0)}).y1(function(t){return p(t.price0+t.price)});var e=w.selectAll(".symbol").transition().duration(v).attr("transform","translate(0,0)").each("end",function(){d3.select(this).attr("transform",null)});e.select("path.area").attr("d",function(t){return k(t.values)}),e.select("path.line").style("stroke-opacity",function(t,e){return 3>e?1e-6:1}).attr("d",function(t){return E(t.values)}),e.select("text").attr("transform",function(t){return t=t.values[t.values.length-1],"translate("+(h-60)+","+p(t.price/2+t.price0)+")"}),setTimeout(r,v+x)}function r(){var t=d3.layout.stack().values(function(t){return t.values}).x(function(t){return t.date}).y(function(t){return t.price}).out(function(t,e){t.price0=e}).order("reverse").offset("wiggle");t(m),E.y(function(t){return p(t.price0)});var e=w.selectAll(".symbol").transition().duration(v);e.select("path.area").attr("d",function(t){return k(t.values)}),e.select("path.line").style("stroke-opacity",1e-6).attr("d",function(t){return E(t.values)}),e.select("text").attr("transform",function(t){return t=t.values[t.values.length-1],"translate("+(h-60)+","+p(t.price/2+t.price0)+")"}),setTimeout(o,v+x)}function o(){var t=w.selectAll(".symbol");E.y(function(t){return p(t.price0+t.price)}),t.select(".line").attr("d",function(t){return E(t.values)}),p.domain([0,d3.max(m.map(function(t){return t.maxPrice}))]).range([y,0]),k.y0(y).y1(function(t){return p(t.price)}),E.y(function(t){return p(t.price)});var e=t.transition().duration(v);e.select(".line").style("stroke-opacity",1).attr("d",function(t){return E(t.values)}),e.select(".area").style("fill-opacity",.5).attr("d",function(t){return k(t.values)}),e.select("text").attr("dy",".31em").attr("transform",function(t){return t=t.values[t.values.length-1],"translate("+(h-60)+","+p(t.price)+")"}),w.append("line").attr("class","line").attr("x1",0).attr("x2",h-60).attr("y1",y).attr("y2",y).style("stroke-opacity",1e-6).transition().duration(v).style("stroke-opacity",1),setTimeout(i,v+x)}function i(){d=d3.scale.ordinal().domain(m[0].values.map(function(t){return t.date})).rangeBands([0,h-60],.1);var t=d3.scale.ordinal().domain(m.map(function(t){return t.key})).rangeBands([0,d.rangeBand()]),e=w.selectAll(".symbol"),n=e.transition().duration(v);n.select(".line").style("stroke-opacity",1e-6).remove(),n.select(".area").style("fill-opacity",1e-6).remove(),e.each(function(e){d3.select(this).selectAll("rect").data(function(t){return t.values}).enter().append("rect").attr("x",function(n){return d(n.date)+t(e.key)}).attr("y",function(t){return p(t.price)}).attr("width",t.rangeBand()).attr("height",function(t){return y-p(t.price)}).style("fill",b(e.key)).style("fill-opacity",1e-6).transition().duration(v).style("fill-opacity",1)}),setTimeout(l,v+x)}function l(){d.rangeRoundBands([0,h-60],.1);var t=d3.layout.stack().values(function(t){return t.values}).x(function(t){return t.date}).y(function(t){return t.price}).out(function(t,e){t.price0=e}).order("reverse"),e=w.selectAll(".symbol");t(m),p.domain([0,d3.max(m[0].values.map(function(t){return t.price+t.price0}))]).range([y,0]);var n=e.transition().duration(v/2);n.select("text").delay(10*m[0].values.length).attr("transform",function(t){return t=t.values[t.values.length-1],"translate("+(h-60)+","+p(t.price/2+t.price0)+")"}),n.selectAll("rect").delay(function(t,e){return 10*e}).attr("y",function(t){return p(t.price0+t.price)}).attr("height",function(t){return y-p(t.price)}).each("end",function(){d3.select(this).style("stroke","#fff").style("stroke-opacity",1e-6).transition().duration(v/2).attr("x",function(t){return d(t.date)}).attr("width",d.rangeBand()).style("stroke-opacity",1)}),setTimeout(s,v+10*m[0].values.length+x)}function s(){d.domain(m.map(function(t){return t.key})).rangeRoundBands([0,h],.2),p.domain([0,d3.max(m.map(function(t){return d3.sum(t.values.map(function(t){return t.price}))}))]);var t=d3.layout.stack().x(function(t,e){return e}).y(function(t){return t.price}).out(function(t,e){t.price0=e});t(d3.zip.apply(null,m.map(function(t){return t.values})));var e=w.selectAll(".symbol"),n=e.transition().duration(v/2);n.selectAll("rect").delay(function(t,e){return 10*e}).attr("y",function(t){return p(t.price0+t.price)-1}).attr("height",function(t){return y-p(t.price)+1}).attr("x",function(t){return d(t.symbol)}).attr("width",d.rangeBand()).style("stroke-opacity",1e-6),n.select("text").attr("x",0).attr("transform",function(t){return"translate("+(d(t.key)+d.rangeBand()/2)+","+y+")"}).attr("dy","1.31em").each("end",function(){d3.select(this).attr("x",null).attr("text-anchor","middle")}),w.select("line").transition().duration(v).attr("x2",h),setTimeout(c,v/2+10*m[0].values.length+x)}function c(){function t(t){var e=d3.select(this),n=d3.select(this.parentNode.appendChild(this.previousSibling)),r=d(t.data.key),o=y-p(t.data.sumPrice);return function(i){var l=y/2/Math.min(1,i+.001),s=Math.cos(i*Math.PI/2),c=-l+s*(r+d.rangeBand())+(1-s)*(h+y)/2,u=s*y+(1-s)*y/2,p={innerRadius:l-d.rangeBand()/(2-s),outerRadius:l,startAngle:s*(Math.PI/2-o/l)+(1-s)*t.startAngle,endAngle:s*(Math.PI/2)+(1-s)*t.endAngle};e.attr("transform","translate("+c+","+u+")"),e.attr("d",a(p)),n.attr("transform","translate("+a.centroid(p)+")translate("+c+","+u+")rotate("+180*((p.startAngle+p.endAngle)/2+3*Math.PI/2)/Math.PI+")")}}var e=w.selectAll(".symbol");e.selectAll("rect").remove();var n=d3.layout.pie().value(function(t){return t.sumPrice}),a=d3.svg.arc();e.append("path").style("fill",function(t){return b(t.key)}).data(function(){return n(m)}).transition().duration(v).tween("arc",t),e.select("text").transition().duration(v).attr("dy",".31em"),w.select("line").transition().duration(v).attr("y1",2*y).attr("y2",2*y).remove(),setTimeout(u,v+x)}function u(){function e(t){t.innerRadius=a,t.outerRadius=r,d3.select(this).transition().duration(v/2).tween("arc",n({innerRadius:o,outerRadius:i}))}function n(t){return function(e){var n=d3.select(this),a=d3.select(this.nextSibling),r=d3.interpolate(e,t);for(var o in t)e[o]=t[o];return function(t){var e=r(t);n.attr("d",l(e)),a.attr("transform","translate("+l.centroid(e)+")translate("+h/2+","+y/2+")rotate("+180*((e.startAngle+e.endAngle)/2+3*Math.PI/2)/Math.PI+")")}}}var a=y/2-d.rangeBand()/2,r=y/2,o=2*y-d.rangeBand()/2,i=2*y,l=d3.svg.arc();w.selectAll(".symbol path").each(e),setTimeout(function(){w.selectAll("*").remove(),w.selectAll("g").data(m).enter().append("g").attr("class","symbol"),t()},v)}var d,p,f,m,g=[0,200,0,0],h=window.innerWidth-g[1]-g[3],y=window.innerHeight-g[0]-g[2],v=1500,x=500,b=d3.scale.ordinal().range(["#2B3990","#CD539E","#47C4BE","#E8942A"]),w=d3.select("#showreel").append("svg").attr("width",h+g[1]+g[3]).attr("height",y+g[0]+g[2]).append("g").attr("transform","translate("+g[3]+","+g[0]+")"),E=d3.svg.line().interpolate("basis").x(function(t){return d(t.date)}).y(function(t){return p(t.price)}),$=d3.svg.line().interpolate("basis").x(function(t){return d(t.date)}).y(y),k=d3.svg.area().interpolate("basis").x(function(t){return d(t.date)}).y1(function(t){return p(t.price)});d3.csv("stocks.csv",function(e){var n=d3.time.format("%b %Y").parse;m=d3.nest().key(function(t){return t.symbol}).entries(f=e),m.forEach(function(t){t.values.forEach(function(t){t.date=n(t.date),t.price=+t.price}),t.maxPrice=d3.max(t.values,function(t){return t.price}),t.sumPrice=d3.sum(t.values,function(t){return t.price})}),m.sort(function(t,e){return e.maxPrice-t.maxPrice});w.selectAll("g").data(m).enter().append("g").attr("class","symbol");setTimeout(t,v)})}function updateWindow(){x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;var t=d3.select("svg");t.attr("width",x).attr("height",y),setupBox(),resizeBoxOverlay(),resizeVideo()}var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName("body")[0],stateObj,isMoving=!1,bwConfig=new Object;bwConfig.xResolution=60,bwConfig.yResolution=40;var bgStore=new Object,url,map,geocoder,marker;window.onresize=updateWindow,$(document).ready(function(){updateWindow(),setupBox(),moveBoxToIndex(1),setupNavLinkClick(),setupFormsAndLinks(),loadScript(),setupUI(),setupReel()});