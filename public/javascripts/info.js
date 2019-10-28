const openTab = (tabName) => {
    let x = document.getElementsByClassName("info-tab");
    for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}