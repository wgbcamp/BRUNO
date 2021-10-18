var x = 0;
var y = 0;

function animateHelp(){
    
    if(x == 0){
        //show and fade in
        document.getElementById('dropdownHelp').style.animation = "grow 0s ease-in-out forwards";
        document.getElementById('dropdownHelp').className = 'fade'; 
        x = 1;

        if(y == 1){
            //hide competing dropdown and fade out
            document.getElementById('dropdownSettings').style.animation = "shrink 0s ease-in-out forwards";
            document.getElementById('dropdownSettings').className = ''; 
            y = 0;
        }
    }else{
        //hide and fade out
        document.getElementById('dropdownHelp').className = '';
        setTimeout(function() {
            document.getElementById('dropdownHelp').style.animation = "shrink 0s ease-in-out forwards";
        }, 500);
        x = 0;
    }
}

function animateSettings(){
    if(y == 0){
        //show and fade in
        document.getElementById('dropdownSettings').style.animation = "grow 0s ease-in-out forwards";
        document.getElementById('dropdownSettings').className = 'fade';
        y = 1;

        if(x == 1){
            //hide competing dropdown and fade out
            document.getElementById('dropdownHelp').style.animation = "shrink 0s ease-in-out forwards";
            document.getElementById('dropdownHelp').className = ''; 
            x = 0;
        }
    }else{
        //hide and fade out
        document.getElementById('dropdownSettings').className = '';
        setTimeout(function() {
            document.getElementById('dropdownSettings').style.animation = "shrink 0s ease-in-out forwards";
        }, 500);
        y = 0;
    }
}