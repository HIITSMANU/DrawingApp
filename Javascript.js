$(function(){
    $(".slider").slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $(".circle").height(ui.value);
            $(".circle").width(ui.value);
        }
    });
    //declare Variable
    // paintingerasing or not
    var paint = false;
    // painting or erasing
    var paint_erase = "paint";
    //get the canvas and the context
    var canvas = document.getElementById("paint");
    var context = canvas.getContext('2d');
    // get the canvas and the container
    var container = $('.containers');
    // mouse position
    var mouse = {x:0 , y:0};

    // onload load saved work from localstorage
    if(localStorage.getItem("imgcanvas") != null){
        var img = new Image();
        img.onload = function(){
            context.drawImage(img,0,0);
        }
        img.src = localStorage.getItem("imgcanvas");
    }
    // set drawing parameters(lineWidth,lineJoin,lineCap)
    canvas.lineWidth = 3;
    canvas.lineJoin = "round";
    canvas.lineCap = "round";

    // click inside container
    container.mousedown(function(e){
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x,mouse.y);
    })
    // move the house while holding the mouse key
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                context.strokeStyle = $("#paintcolor").val();
            }
            else{
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x,mouse.y);
            context.stroke();
        }
    })
    // mouse up -> we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false;
    })
    // if we leave the container we are painting erasing anymore
    container.mouseleave(function(){
        paint = false;
    })
    //click on reset button
    $("#reset").click(function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        // paint = true;
        paint_erase = "paint";
        $("#erase").removeClass("erasemode");
    })
    // click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgcanvas",canvas.toDataURL());
            window.alert(canvas.toDataURL())
        }
        else{
            window.alert("Your Browser is not supporting Local Storage");
        }
    })
    //click on erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase"
        }
        else{
            paint_erase = "paint"
        }
        $(this).toggleClass("erasemode");
    })
    // change linewidth
    $(".slider").slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $(".circle").height(ui.value);
            $(".circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });
    //change color
    $("#paintcolor").change(function(){
        $(".circle").css("background-color",$(this).val())
    })
    

})
// var canvas = document.getElementById("paint");
    // var context = canvas.getContext('2d');
    // context.beginPath();
    // context.moveTo(50,50);
    // context.lineTo(200,200);
    // context.lineTo(400,200);
    // context.lineWidth = 40;
    // context.strokeStyle = '#42e565';
    // context.lineCap = "round";
    // context.lineJoin = "round";
    // context.stroke();