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
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';

    const generateTitleLinks = function (customSelector = '') {
        const titleList = document.querySelector(optTitleListSelector);
        /* remove content of links' list */
        titleList.innerHTML = '';

        /* Find all articles */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

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
            /* START LOOP: for each tag */
            let html = '';
            for (let tag of tagsArray) {
                /* generate HTML of the link */
                const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
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

    const tagClickHandler = function (event){
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.slice(5);
        //const tag = href.replace('#tag-', '');
        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"');
        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {
            /* remove class active */
            activeTagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const selectedTagLinks = document.querySelectorAll(href);
        /* START LOOP: for each found tag link */
        for (let selectedTagLink of selectedTagLinks) {
            /* add class active */
            selectedTagLink.classList.add('active');
        /* END LOOP: for each found tag link */
        console.log('tags: ', selectedTagLink);
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    };

    const addClickListenersToTags = function(){
    /* find all links to tags */
        const tagLinks = document.querySelectorAll('.post-tags a');
        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {  
            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
        }
    };
      
    addClickListenersToTags();      

    const generateAuthors = function() {
        const authors = document.querySelectorAll(optArticleAuthorSelector);
        for (let author of authors) {
            author.innerHTML = '';
            const authorDataTags = author.getAttribute('data-author');
            const authorTag = authorDataTags.slice(0, 3);
            const authorHTML = 'by <a href="#tag-' + authorTag + '">' + authorDataTags + '</a>';
            author.innerHTML = authorHTML;
        }
    };

    generateAuthors();

    const authorClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const authorTag = href.replace('#tag-', '');
        const activeAuthorLinks = document.querySelectorAll('.post-author a[href^="#tag-"]');

        for (let activeAuthorLink of activeAuthorLinks) {
            activeAuthorLink.classList.remove('active');
        }
        const selectedAuthorLinks = document.querySelectorAll(href);
        for (let selectedAuthorLink of selectedAuthorLinks) {
            selectedAuthorLink.classList.add('active');
        }
        generateTitleLinks('[data-author~="' + authorTag + '"]');
    };

    const addClickListenersToAuthors = function() {
        const authorLinks = document.querySelectorAll('.post-author a');
        for (let authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
    };

    addClickListenersToAuthors();
}