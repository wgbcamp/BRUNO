//show number of players dropdown
document.getElementById("selectPlayers").addEventListener("click", function() {
  document.getElementById("myDropdown").classList.toggle("show");
})

//hide number of players dropdown
window.onclick = function(event){
  if(!event.target.matches('.dropbtn')){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for(i = 0; i < dropdowns.length; i++){
      if (dropdowns[i].classList.contains('show')){
        dropdowns[i].classList.remove('show');
      }
    }
  }
}

//sends selected player count to server

document.getElementById('p1').addEventListener("click", function(){
  console.log(document.getElementById('p1').innerHTML);
});
document.getElementById('p2').addEventListener("click", function(){
  console.log(document.getElementById('p2').innerHTML);
});
document.getElementById('p3').addEventListener("click", function(){
  console.log(document.getElementById('p3').innerHTML);
});
document.getElementById('p4').addEventListener("click", function(){
  console.log(document.getElementById('p4').innerHTML);
});
document.getElementById('p5').addEventListener("click", function(){
  console.log(document.getElementById('p5').innerHTML);
});
document.getElementById('p6').addEventListener("click", function(){
  console.log(document.getElementById('p6').innerHTML);
});
document.getElementById('p7').addEventListener("click", function(){
  console.log(document.getElementById('p7').innerHTML);
});
document.getElementById('p8').addEventListener("click", function(){
  console.log(document.getElementById('p8').innerHTML);
});





const socket = new WebSocket('ws://localhost:8080'); 
socket.addEventListener('open', function (event) { 
  socket.send('Hello Server!'); 
}); 

socket.addEventListener('message', function (event) { 
  console.log('Message from server ', event.data); 
});

socket.addEventListener('close', function (event) { 
  console.log('The connection has been closed'); 
});