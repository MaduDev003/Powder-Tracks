function listLinksToggle(){
    const links = document.querySelector('.links');
    const closeLinks = document.querySelector('.close');
    const listLinks = document.querySelector('.list');
    closeLinks.classList.toggle('active');
    listLinks.classList.toggle('active');
    links.classList.toggle('active');
}