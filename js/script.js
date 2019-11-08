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
        optArticleAuthorSelector = '.post-author',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-';
        // optTagsListSelector = '.tags.list';

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

    const calculateTagsParams = function(tags) {
        const params = {
            min: 999999,
            max:0
        };
        for (let tag in tags) {
            if (tags[tag] > params.max) {
                params.max = tags[tag];
            } else if (tags[tag] < params.min) {
                params.min = tags[tag];
            }
            console.log(tag + ' is used ' + tags[tag] + ' times');
        }
        return params;
    };

    const calculateTagClass = function(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

        return (optCloudClassPrefix + classNumber);
    };

    const generateTags = function() {
        /* create a new variable allTags with an empty object */
        let allTags = {};
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
                const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
                /* add generated code to html variable */
                html = html + ' ' + linkHTML;
                /* check if this link is NOT already in allTags */
                if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
                    /* add generated code to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }
            /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsList.innerHTML = html;
        /* END LOOP: for every article: */
        }
        /* find list of tags in right column */
        const tagList = document.querySelector('.tags');
        /* create variable for all links HTML code */
        const tagsParams = calculateTagsParams(allTags);
        let allTagsHTML = '';

        /* START LOOP: for each tag in allTags */
        for (let tag in allTags) {
            /* generate code of a link and add it to allTagsHTML */
            allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' </a></li>';
            /* END LOOP: for each tag in allTags  */
        }
        /* add html from allTagsHTML to tagList */
        tagList.innerHTML = allTagsHTML;
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
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {
            /* remove class active */
            activeTagLink.classList.remove('active');
        /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const selectedTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (let selectedTagLink of selectedTagLinks) {
            /* add class active */
            selectedTagLink.classList.add('active');
            /* END LOOP: for each found tag link */
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
        const tagsCloudLinks = document.querySelectorAll('.list.tags a');
        for (let tagsCloudLink of tagsCloudLinks) {
            tagsCloudLink.addEventListener('click', tagClickHandler);
        }
    };
      
    addClickListenersToTags();      

    const generateAuthors = function() {
        let allAuthors = {};
        let allAuthorsHTML = '';
        const articles = document.querySelectorAll(optArticleSelector);
        const authorsList = document.querySelector('.list.authors');
        // authorsList.innerHTML = '';
        for (let article of articles) {
            const postAuthor = article.querySelector(optArticleAuthorSelector);
            postAuthor.innerHTML = '';
            const authorData = article.getAttribute('data-author');
            const authorHTML = 'by <a href="#auth-' + authorData + '">' + authorData + '</a>';
            if (!Object.prototype.hasOwnProperty.call(allAuthors, authorData)) {
                allAuthors[authorData] = 1;
            } else {
                allAuthors[authorData]++;
            }
            postAuthor.innerHTML = authorHTML;
        }
        for (let author in allAuthors) {
            allAuthorsHTML += '<li><a href="#auth-' + author + '">' + author + '</a> (' + allAuthors[author] + ')</li>';
        }
        authorsList.innerHTML = allAuthorsHTML;
    };

    generateAuthors();

    const authorClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const auth = href.slice(6);
        const activeAuthors = document.querySelectorAll('a.active[href^="#auth-"]');
        for (let activeAuthor of activeAuthors) {
            activeAuthor.classList.remove('active');
        }
        const selectedAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
        for (let selectedAuthorLink of selectedAuthorLinks) {
            selectedAuthorLink.classList.add('active');
        }
        generateTitleLinks('[data-author="' + auth + '"]');
    };

    const addClickListenersToAuthors = function() {
        const authorLinks = document.querySelectorAll('.post-author a');
        for (let authorLink of authorLinks) {
            authorLink.addEventListener('click', authorClickHandler);
        }
        const authorsListLinks = document.querySelectorAll('.list.authors a');
        for (let authorsListLink of authorsListLinks) {
            authorsListLink.addEventListener('click', authorClickHandler);
        }
    };

    addClickListenersToAuthors();
}