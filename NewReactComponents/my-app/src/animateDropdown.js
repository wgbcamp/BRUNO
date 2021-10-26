var a;
var b;

export const animateDropdown = e => {
    if(e.target.id == 'help'){
        a = document.getElementById('dropdownHelp');
        b = document.getElementById('dropdownSettings');
        //show scroll bar when help is selected
        document.body.style.overflowY = "visible";
    }else{
        a = document.getElementById('dropdownSettings');
        b = document.getElementById('dropdownHelp');
        
    }
    var c = document.getElementById("mainGrid");
    if(a.style.zIndex == 0){
        //swap transparencies and z-index
        a.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
        c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
        setTimeout(() => { a.style.zIndex = 1; c.style.zIndex = 0; }, 200);

        if(b.style.zIndex == 1){
            //transparent background and last clicked dropdown, send last clicked to bottom
            b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
            c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 0, fill: 'forwards' });
            setTimeout(() => { b.style.zIndex = 0; }, 200);
            //hide scroll bar when help is hidden
            document.body.style.overflowY = "hidden";
        }
    }else{
        //swap transparencies and z-index back to original
        a.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
        c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: 'forwards' });
        setTimeout(() => { a.style.zIndex = 0; c.style.zIndex = 1; window.scrollTo(0, 0); }, 200);
        //hide scroll bar when help is hidden
        document.body.style.overflowY = "hidden";
    }
}