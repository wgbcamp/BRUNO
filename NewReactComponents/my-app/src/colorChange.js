export const changeToWhite = e => e.target.style.color = 'white';
export const changeToBlack = e => e.target.style.color = 'black';

var x;
var y;

export const btnClrShift = e => {
    console.log("I WORK")
    x = getComputedStyle(e.target).getPropertyValue("background-color").toString();
    y = getComputedStyle(e.target).getPropertyValue("color").toString();
    e.target.animate([{ backgroundColor: '#b3b3b3' }], {duration: 200, fill: 'forwards'});
    e.target.animate([{ color: 'white'}], {duration: 0, fill: 'forwards'});
}

export const originalColor = e => {
    e.target.animate([ {backgroundColor: x }], {duration: 200, fill: 'forwards' });
    e.target.animate([{ color: y }], {duration: 200, fill: 'forwards'});
}

