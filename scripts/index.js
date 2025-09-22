function toggleListLinks() {
    const links = document.querySelector('.links');
    const closeLinks = document.querySelector('.close');
    const listLinks = document.querySelector('.list');

    // Toggle menu mobile
    closeLinks.classList.toggle('active');
    listLinks.classList.toggle('active');
    links.classList.toggle('active');

}


function choosePage(event) {
    let clickedLi = event.target.closest('li.link');
    if (!clickedLi) return;

    const allLinks = document.querySelectorAll('.links .link');
    allLinks.forEach(link => link.classList.remove('active'));
    clickedLi.classList.add('active');
}
