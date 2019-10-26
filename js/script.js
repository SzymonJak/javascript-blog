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
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list';

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

    const generateTags = function() {
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
        /* find tags wrapper */
            const tagsList = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            tagsList.innerHTML = '';
            /* get tags from data-tags attribute */
            const articleDataTags = article.getAttribute('data-tags');
            /* split tags into array */
            const tagsArray = articleDataTags.split(' ');
            console.log('example: ', tagsArray);
            /* START LOOP: for each tag */
            let html = '';
            for (let tag of tagsArray) {
                /* generate HTML of the link */
                const tagHTML = '<li><a href="#">' + tag + '</a></li>';
                /* add generated code to html variable */
                html = html + ' ' + tagHTML;
            /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsList.innerHTML = html;
        /* END LOOP: for every article: */
        }
    };

    generateTags();

}