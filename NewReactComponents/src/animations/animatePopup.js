export const animatePopup = e => {
    if(e.target.id == "createSession"){
        document.getElementById('sessionPopup').style.zIndex = 5;
        document.body.style.filter = "brightness(50%)";
    }
}