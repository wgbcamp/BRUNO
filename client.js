var clientID;

//web socket connections
const socket = new WebSocket('ws://localhost:8080'); 
socket.addEventListener('open', function (event) {
  clientID = Math.random().toString(36).substring(7);
  // socket.send('Hello Server!'); 
}); 

socket.addEventListener('message', function (event) { 
  console.log('Message from server ', event.data); 
});

socket.addEventListener('close', function (event) { 
  console.log('The connection has been closed'); 
});

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
let x = document.querySelectorAll('a');
for (i of x) {
  i.addEventListener('click', function(){
    var pCount = {
      type: "pCount",
      text: this.id,
      id: clientID
    }
    socket.send(JSON.stringify(pCount));

  })
}


