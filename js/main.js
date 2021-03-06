// import some utility functions
import { uniqueId, timespan } from './utils.js';


// this is the underlying data of the web page
let posts = [
    {
        id: "post_jd4111h4",                    // post id
        userId: "nkim",                          // user id who created this post
        userImg: "img/nkim.png",                // thumbnail image of the user
        img: "img/post1.jpg",                   // post image
        likes: 0,                                // # of likes
        datetime: "2018-02-02T00:40:33.000Z",    // time posted
        comments: [                              // user comments for this post
            {
                userId: "nkim",                 // user id who commented
                text: "Let's Go Travel!"         // text of the comment
            }
        ]
    },
    {
        id: "post_jd5ikpep",
        userId: "nkim",
        userImg: "img/nkim.png",
        img: "img/post2.jpg",
        likes: 0,
        datetime: "2018-02-01T00:40:33.000Z",
        comments: []
    }
];

/**
 * TODO 1: Add a new post using any image (e.g., "img/posts3.jpg"). Other properties remain the same.
 *  hint: generate a unique id using "uniqueId('post_')"
 *  hint: posts.push( { ... } )
 *  hint: for "datetime", use now (i.e., new Date())
 */


 /**
 * TODO 2: Similarly, add a new comment for the new post.
 */


/**
 * TODO 3: Print "posts" and use the developer console to see if the data looks fine.
 */



function renderComment(comment) {
    // using a template string to dynamically generate a HTML text
    return `<div class="comment">
        <a class="id">${comment.userId}</a><span>${comment.text}</span>
    </div>`
}


function renderPost(post) {
    /**
     * TODO 4: Briefly explain how comments are rendered.
     *  hint: i.e., explain this code below: "comments.map(c=>renderComment(c)).join('')"
     *  hint: refer to "map" & "join" methods in Array
     */


    /**
     * TODO 5: Briefly explain what happens when "post.likes" is greater than zero.
     */


    /**
     * TODO 6: Set "data-post-id" attribute as the id of this post in the root div (i.e., class="post").
     *  hint: data-attribute allows us to embed custom data into HTML and retrieve it later using Javascript
     *  hint: in other words, this will allow us to know which post object to update on user actions
     */
    return `<div class="post">
                <header class="header">
                    <a class="photo">
                        <img src="${post.userImg}">
                    </a>
                    <a class="id">${post.userId}</a>
                </header>
                <div class="content">
                    <img class="image" src="${post.img}"/>
                </div>
                <div class="footer">
                    <div class="action">   
                        <a class="icon ${post.likes > 0 ? 'heart' : 'like'}">Like</a>  
                        <a class="icon comment">Comment</a>  
                        <a class="icon save">Save</a>  
                    </div>
                    <div class="likes">      
                        ${post.likes} likes
                    </div>
                    <div class="comments">
                        ${post.comments.map(c => renderComment(c)).join('')}  
                    </div>
                    <time class="time">          
                        ${timespan(post.datetime).toUpperCase()} AGO
                    </time>
                    <div class="add-comment">
                        <input type="text" placeholder="Add a comment…"></input>
                    </div>
                </div>
            </div>`
}

function render(posts) {
    // get the posts element
    let postsElm = document.querySelector('.posts');
    
    // redner posts inside postsElm
    postsElm.innerHTML = posts.map(p => renderPost(p)).join('');


    /**
     * TODO 7: Explain what's selected by the following code
     */
    let imageElms = document.querySelectorAll('.post .content .image');

    imageElms.forEach(el => el.addEventListener('dblclick', function () {
        /**
         * TODO 8: Print 'this' keyword to the developer console and explain what's contained in 'this'
         *  hint: who is calling this function and when
         */

        let postId = this.parentNode.parentNode.getAttribute('data-post-id');
        increaseLike(posts, postId);
    }));


    
    let commentElms = document.querySelectorAll('.post .add-comment input');
    commentElms.forEach(el => el.addEventListener('change', function () {
        /**
         * TODO 9: Print 'this.value' to the developer console
         */


        /**
         * TODO 10: Traverse the DOM to find the div element with a class name of 'post' and 'data-post-id'
         *  hint: refer to the rednerPost function
         *  hint: use 'parentNode' to traverse up the DOM tree
         *  hint: use getAttribute to get the value of 'data-post-id' attribute
         */
        let postId = null;
        addComment(posts, postId, 'kgajos', this.value);
        this.value = ''; //empty
    }))

}

function increaseLike(posts, postId) {
    let post = posts.find(p => p.id == postId);// return the first element matching the condition
    if (!post) return;

    post.likes = post.likes + 1;

    localStorage.setItem('posts', JSON.stringify(posts));

    render(posts); // re-render with the updated posts

}

function addComment(posts, postId, userId, text) {
    /**
     * TODO 11: Fill in this method 
     *  hint: refer to "increaseLike"
     */
}


function initialize() {

    let initState = localStorage.getItem('posts');

    if (initState != null) {
        // JSON: 
        posts = JSON.parse(initState); 
    }
    render(posts);
}

initialize();// call init

/**
 * TODO 12 (Optional): Try adding additional functionalities. For example,
 *  1) Clicking the heart icon to increase the number of likes
 *  2) Deleting comments 
 *  3) Adding a new post
 *  etc
 */