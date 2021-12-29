export const animatePopup = e => {
    if(e.target.id == "createSession"){
        document.getElementById('sessionPopup').style.zIndex = 5;
        document.getElementById('sessionPopupContainer').style.zIndex = 5;
        document.getElementById('sessionPopup').style.opacity = 1;
        document.getElementById('mainGrid').style.filter = "brightness(25%)";
        document.getElementById('headerBar').style.filter = "brightness(25%)";
    }
}

export const deanimatePopup = e => {
    if(e.target.id == "sessionPopupContainer"){
        document.getElementById('sessionPopup').style.zIndex = -1;
        document.getElementById('sessionPopupContainer').style.zIndex = -1;
        document.getElementById('sessionPopup').style.opacity = 0;
        document.getElementById('mainGrid').style.filter = "brightness(100%)";
        document.getElementById('headerBar').style.filter = "brightness(100%)";
    }
}