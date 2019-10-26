'use strict';
{
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        /* [DONE] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    const generateTitleLinks = function () {
        const titleList = document.querySelector(optTitleListSelector);
        /* remove content of links' list */
        titleList.innerHTML = '';

        /* Find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        let html = '';

        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');
            /* Find title element and get title */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /* create links and save it as a const */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            /* - insert created HTML code into html variable */

            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        // titleList.insertAdjacentHTML('beforeend', html);

        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    };

    generateTitleLinks();

}