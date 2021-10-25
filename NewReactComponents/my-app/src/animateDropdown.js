// function animateDropdown(value){
//     var x;
//     var y;
//     if(value == "help"){
//         x = "Help";
//         y = "Settings";
//     }else{
//         x = "Settings";
//         y = "Help";
//     }
//     var a = document.getElementById(`dropdown${x}`);
//     var b = document.getElementById(`dropdown${y}`);

//     console.log(a);
//     console.log(b);
//         if(a.className == ''){
//             //show and fade in
//             a.style.animation = "grow 0s ease-in-out forwards";
//             a.className = 'fade'; 
    
//             if(b.className == 'fade'){
//                 //hide competing dropdown and fade out
//                 b.style.animation = "shrink 0s ease-in-out forwards";
//                 b.className = ''; 
//                 //keep background color the same during transition
//                 document.body.style.backgroundColor = "#FCFDFF";
//             }
//         }else{
//             //fade out then hide
//             a.className = '';
//             setTimeout(function() {
//                 a.style.animation = "shrink 0s ease-in-out forwards";
//             }, 500);
//             //return background color to base color if changed
//             document.body.style.backgroundColor = "#FCFDFF";
//         }
//   }

//   export default animateDropdown;

var x;
var y;

export const animateDropdown = e => {
    if(e.target.id == 'help'){
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
        if(!a.classList.contains('fade')){
            console.log("YES");
            //show and fade in
            a.animate([{ height: '0%' }, { height: '100%' }], { duration: 0, fill: 'forwards' });
            a.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
            a.classList.add('fade');
    
            if(b.classList.contains('fade')){
                //hide competing dropdown and fade out
                b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
                setTimeout(function() {
                b.animate([{ height: '100%' }, { height: '0%' }], { duration: 0, fill: 'forwards' });
                }, 200);
                b.classList.remove('fade');
            }
        }else{
            console.log("NO");
            //fade out then hide
            a.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
            setTimeout(function() {
            a.animate([{ height: '100%' }, { height: '0%' }], { duration: 0, fill: 'forwards' });
            }, 200);
            a.classList.remove('fade');
        }
}