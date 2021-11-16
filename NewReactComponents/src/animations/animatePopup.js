export const animatePopup = e => {
    if(e.target.id == "createSession"){
        document.getElementById('sessionPopup').style.zIndex = 5;
        document.getElementById('sessionPopupContainer').style.zIndex = 5;
        document.getElementById('sessionPopup').style.opacity = 1;
        document.getElementById('mainGrid').style.filter = "brightness(25%)";
        document.getElementById('headerBar').style.filter = "brightness(25%)";
    }
}