function animateDropdown(value){
    var x;
    var y;
    if(value == "help"){
        x = "Help";
        y = "Settings";
    }else{
        x = "Settings";
        y = "Help";
    }
    var a = document.getElementById(`dropdown${x}`);
    var b = document.getElementById(`dropdown${y}`);

    console.log(a);
    console.log(b);
        if(a.className == ''){
            //show and fade in
            a.style.animation = "grow 0s ease-in-out forwards";
            a.className = 'fade'; 
    
            if(b.className == 'fade'){
                //hide competing dropdown and fade out
                b.style.animation = "shrink 0s ease-in-out forwards";
                b.className = ''; 
                //keep background color the same during transition
                document.body.style.backgroundColor = "rgb(253, 68, 68)";
            }
        }else{
            //fade out then hide
            a.className = '';
            setTimeout(function() {
                a.style.animation = "shrink 0s ease-in-out forwards";
            }, 500);
            //return background color to white if changed
            document.body.style.backgroundColor = "white";
        }
  }

  export default animateDropdown;