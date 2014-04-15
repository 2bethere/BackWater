var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

var isMoving = false;

var bwConfig = new Object();
bwConfig.xResolution = 60;
bwConfig.yResolution = 40;

var bgStore = new Object();

/* Main stage program starts here */
var url;

$( document ).ready(function() {
    updateWindow();
    setupNavLinkClick();
    setupFormsAndLinks();

    //setupScroll();

});


function setupScroll(){
    if (document.addEventListener) {
        document.addEventListener("mousewheel", MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
        document.addEventListener("wheel", MouseWheelHandler, false); //Firefox
    } else {
        document.attachEvent("onmousewheel", MouseWheelHandler); //IE 6/7/8
    }
}

function setupFormsAndLinks(){
    $(document).on("click","#boxoverlay a[href]",function(e){
        $("#boxoverlay").load(e.target.href, function(){
            console.log("new page loaded");
        });
        return false;
    });
    $(document).on("submit", "#boxoverlay", function (e) {
        console.log(e.target);
        var $this = $(e.target);
        $.post($this.attr('action'), $this.serialize(), function (data) {
            $("#boxoverlay").html(data);
        }, 'html');
        return false;
    });
}

function setupNavLinkClick(){
    $(".navmid li").click(function(event){
        event.preventDefault();
        url = event.target.href;
        if(!url){
            url = $(event.target).children(":first")[0].href;
        }
        var $t = $(event.target);
        var offset = $t.offset().left + ( $t.width() - $("#boxoverlay").width())/2 ;
        console.log(offset);
        // Hide if the box is visible
        $("#boxoverlay").slideUp("fast");

        $("#boxoverlay").offset({ top: 60, left: offset });
        $.ajax( url )
            .done(function(result) {
                $("#boxoverlay").html(result);
                $("#boxoverlay").slideDown("slow");
                console.log("new page loaded");
                console.log($('#fullpage'));
                $('#fullpage').fullpage(
                    {verticalCentered:false,
                        navigation:true,
                        normalScrollElements: '#map-canvas',
                        afterLoad: renderPostGraph
                        });
            })
            .fail(function(result) {
                $("#boxoverlay").load("/users/sign_in");
                $("#boxoverlay").slideDown("slow");
            });
    });
}

function renderPostGraph(anchorLink, index) {
    var target = $(".section")[index - 1];

}

function updateWindow(){
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	var svg = d3.select("svg");
    svg.attr("width", x).attr("height", y);
}

function MouseWheelHandler(e) {

// cross-browser wheel delta
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1,
            (e.wheelDelta || -e.deltaY || -e.detail)));
        if (!isMoving) { //if theres any #
            if (delta < 0) {
                isMoving = true;
                scrollPage("down");
            }else{
                isMoving = true;
                scrollPage("up");
            }
        }
        return false;
}

function scrollPage(direction){
    if(direction == "up")
    {

    }else{

    }
}

window.onresize = updateWindow;