// var array = [1,2,10,14,5,7,50,234];

// for (i=0; i<Math.ceil(array.length/2); i++){
    
//     var tempValue;
//     var value2 = array.length-i;

//     value2--;

//     tempValue = array[i];
//     array[i] = array[value2];
//     array[value2] = tempValue;
// }

//     console.log(array);
//     // console.log(array[0])
//     // console.log(array[array.length-1])

var array = ["candy", "apple", "stacy"];

array.push(array.splice(0,1).toString())
// array.splice(array.length,1,array[0])
console.log(array)
