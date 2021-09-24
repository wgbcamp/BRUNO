var cart = document.getElementById('cart');
var signIn = document.getElementById('signIn');
var rightNavbarContainer = document.getElementById('rightNavbarContainer');
var searchBar = document.getElementById('searchBar');
var searchContainer = document.getElementById('searchContainer');
var searchIcon = document.getElementById('searchIconContainer');
var minimizedSearch = document.getElementById('minimizedSearch');
var menu = document.getElementById('menu');
var headerGrid = document.getElementById('headerGrid');

window.onclick = function(){
    
    console.log(this.id);
};

function dimContent(){
    document.getElementById('mainContent').style.animation = "dim 0.2s linear forwards";
}

function removeDimming(){
    
    // document.getElementById('mainContent').style.animation = "removeDim 0.2s linear forwards";
}

function responsiveHeaderbar(){

    //greater than 650px, less than/equal to 950px
    if(window.innerWidth <= 950 && window.innerWidth > 650){
        //cart
        cart.style.justifyContent = "center";
        cart.style.gridColumn = "2/3";
        //signIn
        signIn.style.gridColumn = "1/2";
        signIn.innerHTML = `<i class="fas fa-user"></i>`;
        signIn.style.justifyContent = "center";
        signIn.style.marginRight = "0px";
        //rightNavbar container
        rightNavbarContainer.style.gridTemplateColumns = "50% 50%";
        //searchBar
        searchBar.style.gridColumn = "1/4";
        searchIcon.style.gridColumn = "4/6";
        searchContainer.style.gridTemplateColumns = "25% 16% 50% 7% 2%";
        searchContainer.style.visibility = "visible";
        minimizedSearch.style.visibility = "hidden";
        //hamburger menu
        menu.innerHTML = `<i class="fas fa-bars fa-1x"></i>`;
        //headerGrid
        headerGrid.style.gridTemplateColumns = "15% 10% 55% 20%";

    //greater than 500px, less than/equal 650px
    }else if(window.innerWidth <= 650 && window.innerWidth > 500){
        //cart
        cart.style.justifyContent = "center";
        cart.style.gridColumn = "3/4";
        cart.style.marginRight = "0px";
        //signIn
        signIn.style.gridColumn = "2/3";
        signIn.innerHTML = `<i class="fas fa-user"></i>`;
        signIn.style.justifyContent = "center";
        signIn.style.marginRight = "0px";
        //rightNavbar container
        rightNavbarContainer.style.gridTemplateColumns = "1fr 1fr 1fr";
        //searchBar
        searchBar.style.gridColumn = "1/4";
        searchIcon.style.gridColumn = "4/6";
        searchContainer.style.visibility = "hidden";
        minimizedSearch.style.visibility = "visible";
        //hamburger menu
        menu.innerHTML = `<i class="fas fa-bars fa-1x"></i>`;
        //headerGrid
        headerGrid.style.gridTemplateColumns = "20% 10% 40% 30%";

    //less than/equal 650px
    }else if(window.innerWidth <= 500){

    //greater than 950px
    }else{
        //cart
        cart.style.justifyContent = "center";
        cart.style.gridColumn = "2/3";
        //signIn
        signIn.style.gridColumn = "1/2";
        signIn.innerHTML = `Sign In
        <i class="fas fa-user signInIcon"></i>`;
        signIn.style.justifyContent = "flex-end";
        signIn.style.marginRight = "20px";
        //rightNavbar container
        rightNavbarContainer.style.gridTemplateColumns = "70% 30%";
        //searchBar
        searchBar.style.gridColumn = "3/4";
        searchIcon.style.gridColumn = "4/5";
        searchContainer.style.gridTemplateColumns = "25% 16% 50% 7% 2%";
        searchContainer.style.visibility = "visible";
        minimizedSearch.style.visibility = "hidden";
        //hamburger menu
        menu.innerHTML = `<i class="fas fa-bars fa-1x"></i>
        Menu`;
        //headerGrid
        headerGrid.style.gridTemplateColumns = "20% 10% 50% 20%";
    }
}

window.onload = function(){
    responsiveHeaderbar();
}

window.onresize = function(){
    responsiveHeaderbar();
}

function showSearchBar(){

    document.getElementById('spannedSearchContainer').style.animation = "revealSpannedSearchBar 0.2s linear forwards";
    focusSearchBar();
    dimContent();
}

function hideSearchBar(){

}

function focusSearchBar(){
    document.getElementById("spannedSearchBar").focus();
}