export const changeToWhite = e => e.target.style.color = '#8f8f8f';
export const changeToBlack = e => e.target.style.color = 'black';

export const btnClrShift = e => {
    e.target.animate([{ backgroundColor: '#b3b3b3' }], {duration: 200, fill: 'forwards'});
    e.target.animate([{ color: 'white'}], {duration: 0, fill: 'forwards'});
}

export const originalColor = e => {
    if(localStorage.getItem('darkMode') == 'enabled'){
        e.target.animate([ {backgroundColor: '#5eff99' }], {duration: 200, fill: 'forwards' });
        e.target.animate([{ color: 'black' }], {duration: 200, fill: 'forwards'});
    }else{
        e.target.animate([ {backgroundColor: '#c079ff' }], {duration: 200, fill: 'forwards' });
        e.target.animate([{ color: 'black' }], {duration: 200, fill: 'forwards'});
    }   
}

export const darkMode = (type) => {
    console.log(type)
    var c = [];
    switch(localStorage.getItem('darkMode')){
        case 'enabled':
            c[1] = '#fdf906';
            c[2] = '#c079ff';
            c[3] = 'white';
            c[4] = 'black';
            c[5] = '#383838';
            c[6] = 'Enable Dark Mode';
            c[7] = 'disabled';
            break;
        case 'disabled':
            c[1] = '#d549eb';
            c[2] = '#5eff99';
            c[3] = '#3d298a';
            c[4] = 'white';
            c[5] = '#ededed';
            c[6] = 'Disable Dark Mode';
            c[7] = 'enabled';
            break;
    }

    switch(type){
        case 'pageLoad':
            document.getElementById('headerBar').style.backgroundColor = c[1];

            var x = document.querySelectorAll('.btnClr');
            for (var i=0; i<x.length; i++){
                x[i].style.backgroundColor = c[2];
            }
        
            document.body.style.backgroundColor = c[3];
            document.getElementById('mainGrid').style.backgroundColor = c[3];
            document.getElementById('dropdownHelp').style.backgroundColor = c[3];
            document.getElementById('dropdownSettings').style.backgroundColor = c[3];
            
            document.getElementById('title').style.color = c[4];
            document.getElementById('subtitle').style.color = c[5];
            document.getElementById('dropdownHelp').style.color = c[5];
        
            document.getElementById('darkMode').innerHTML = c[6];
            localStorage.setItem('darkMode', c[7]);
            document.body.style.opacity = 1;
            break;
        default:
            document.getElementById('headerBar').animate([{backgroundColor: c[1]}], {duration: 200, fill: 'forwards'});

            var x = document.querySelectorAll('.btnClr');
            for (var i=0; i<x.length; i++){
                x[i].animate([{backgroundColor: c[2]}], {duration: 200, fill: 'forwards'});
            }
        
            document.body.animate([{backgroundColor: c[3]}], {duration: 200, fill: 'forwards'});
            document.getElementById('mainGrid').animate([{backgroundColor: c[3]}], {duration: 200, fill: 'forwards'});
            document.getElementById('dropdownHelp').style.backgroundColor = c[3];
            document.getElementById('dropdownSettings').animate([{backgroundColor: c[3]}], {duration: 200, fill: 'forwards'});
            
            document.getElementById('title').style.color = c[4];
            document.getElementById('subtitle').style.color = c[5];
            document.getElementById('dropdownHelp').style.color = c[5];
        
            document.getElementById('darkMode').innerHTML = c[6];
            localStorage.setItem('darkMode', c[7]);
    }
}
