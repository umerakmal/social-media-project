const userapi = "https://dummyapi.io/data/v1/user?limit=10";
const postapi = "https://dummyapi.io/data/v1/tag/water/post?limit=10";
const commentsapi = "https://dummyapi.io/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10";
const appid = "6621243a0635477ca08b0ae1";

const data = JSON.parse(localStorage.getItem('logged-in'));
// console.log(data);
const friendSection = document.querySelector(".friend-section");
const postSection = document.querySelector(".post-section");
const messageSection = document.querySelector(".message-section");
const requestSection = document.querySelector('.request-section');
const signOut = document.querySelector(".sign-out");
const sideBar = document.querySelector('.side-bar');
const sideBarData = document.querySelector('.side-bar-data');
const groups = document.querySelector('.groups');
const groupSection = document.querySelector('.group-section');
const rightSection = document.querySelector('.right-section');
const leftSection = document.querySelector('.left-section');
const modalBody = document.querySelector('.modal-body');
const crossTicks = document.querySelectorAll('.common i');


crossTicks.forEach(ele => {
  ele.addEventListener('click', () => {
    ele.parentElement.parentElement.parentElement.classList.toggle('db');
    ele.parentElement.parentElement.classList.toggle('db');
  })
})

function common(event){
    if(event.target.classList.contains('groups')){
      leftSection.classList.toggle('db');
      groupSection.classList.toggle('db');
    }
    else if(event.target.classList.contains('friends')){
      leftSection.classList.toggle('db');
      friendSection.classList.toggle('db');
    }
    else if(event.target.classList.contains('messages')){
      rightSection.classList.toggle('db');
      messageSection.classList.toggle('db');
    }
    else if(event.target.classList.contains('requests')){
      rightSection.classList.toggle('db');
      requestSection.classList.toggle('db');
    }
  
}

async function getData(url) {
  try {
    let data = await fetch(url, { headers: { "app-id": appid } });
    let jsondata = data.json();
    // console.log(jsondata)
    return jsondata;
  } catch (err) {
    console.log(err);
  }
}

async function userData() {
  let userFetch = await getData(userapi);
  let userArr = userFetch.data;
  // console.log(userArr);
  let storyParent = document.querySelector(".storyParent");
  let messageArr = ['Hello, lets meet', 'Hi,', 'Where are you?', 'hy', 'I love you']
  for (let i = 0; i < userArr.length; i++) {
    let friend = document.createElement("div");
    let friendPic = document.createElement("div");
    let friendName = document.createElement("div");
    let messageBox = document.createElement('div');
    let messagePic = document.createElement('div');
    let messageInfo = document.createElement('div');
    let message = document.createElement('p');
    let messageSender = document.createElement('h6');
    let requestBox = document.createElement('div');
    let requestImg = document.createElement('div');
    let requestInfo = document.createElement('div');
    let requestSender = document.createElement('h6');
    let addBtn = document.createElement('btn');
    let delBtn = document.createElement('btn');
    let requestHeader = document.createElement('div')

    friend.classList.add("friend");
    friendPic.classList.add("friend-img");
    friendName.classList.add("friend-name");
    messageBox.classList.add('message-box');
    messagePic.classList.add('friend-img');
    messageInfo.classList.add('message-info');
    requestBox.classList.add('request-box');
    requestImg.classList.add('request-img');
    requestInfo.classList.add('request-info');
    requestHeader.classList.add('request-header');
    addBtn.classList.add('add-btn');
    delBtn.classList.add('del-btn');

    friendPic.innerHTML = `<img src='${userArr[i].picture}' alt='friend img'>`;
    messagePic.innerHTML = `<img src='${userArr[i].picture}' alt='friend img'>`;
    friendName.innerHTML = `<h6>${userArr[i].firstName} ${userArr[i].lastName}</h6>`;
    messageSender.innerHTML = `${userArr[i].firstName} ${userArr[i].lastName}`;

    message.innerHTML = `<b>${messageArr[Math.floor(Math.random() * 4) + 1]}</b>`


    friend.append(friendPic);
    friend.append(friendName);

    friendSection.append(friend);

    messageInfo.append(messageSender);
    messageInfo.append(message);

    messageBox.append(messagePic);
    messageBox.append(messageInfo);

    messageSection.append(messageBox);

    requestImg.innerHTML = friendPic.innerHTML;
    requestSender.innerHTML = messageSender.innerHTML;
    addBtn.innerHTML = 'Confirm';
    delBtn.innerHTML = 'Delete';

    addBtn.addEventListener('click', () => {
      requestBox.remove();
      if (!requestSection.querySelector('.request-box')) {
        let noReq = document.createElement('h6');
        noReq.innerHTML = 'No Requests';
        requestSection.innerHTML = '';
        requestSection.append(noReq);
    }
    })

    delBtn.addEventListener('click', () => {
      requestBox.remove();
      if (!requestSection.querySelector('.request-box')) {
          let noReq = document.createElement('h6');
          noReq.innerHTML = 'No Requests';
          requestSection.innerHTML = '';
          requestSection.append(noReq);
      }
  });

    requestHeader.append(requestImg);
    requestHeader.append(requestSender);
    requestInfo.append(addBtn);
    requestInfo.append(delBtn);
    requestBox.append(requestHeader)
    requestBox.append(requestInfo)
    
    requestSection.append(requestBox);

    storyParent.innerHTML += `
        <div class="story">
        <img src="${userArr[i].picture}" alt="person"> 
        </div>
        `;
      }
    }
    
    async function postData() {
  let postFetch = await getData(postapi);
  // console.log(postFetch.data)
  let postArr = postFetch.data;

  for (let i = 0; i < postArr.length; i++) {
    let post = document.createElement("div");
    post.classList.add("post");

    let postHeader = document.createElement("div");
    postHeader.classList.add("post-header");

    let userImg = document.createElement("div");
    userImg.classList.add("user-img");

    userImg.innerHTML = `<img src="${postArr[i].owner.picture}" alt="person">`;

    let userInfo = document.createElement("div");
    userInfo.classList.add("user-info");

    userInfo.innerHTML = `
        <h5>${postArr[i].owner.firstName} ${postArr[i].owner.lastName}</h5>
        <p>${postArr[i].publishDate}</p>
        `;

    postHeader.append(userImg);
    postHeader.append(userInfo);

    let postImg = document.createElement("div");
    postImg.classList.add("post-img");

    postImg.innerHTML = `<img src="${postArr[i].image}" alt="person">`;

    let postInfo = document.createElement("div");
    postInfo.classList.add("post-info");

    let postLikes = document.createElement("div");
    postLikes.classList.add("post-likes");

    let likeCount = document.createElement("span");
    likeCount.classList.add("like-count");

    likeCount.innerHTML = `Liked by <b>Umer Akmal</b> and ${postArr[i].likes} others`;

    let flag = true;
    let likeButton = document.createElement("button");
    likeButton.classList.add("like-btn");
    likeButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    likeButton.addEventListener("click", function () {
      if (flag) {
        postArr[i].likes += 1;
        likeButton.style.color = "red";
        flag = false;
      } else {
        postArr[i].likes -= 1;
        likeButton.style.color = "black";
        flag = true;
      }
      likeCount.innerHTML = ` Liked by <b>Umer Akmal</b> and ${postArr[i].likes} others`;
    });

    postLikes.append(likeButton);
    postLikes.append(likeCount);

    let postTags = document.createElement("div");
    postTags.innerHTML = `<p><u>Tags:</u> ${postArr[i].tags}</p>`;

    postInfo.append(postLikes);
    postInfo.append(postTags);

    let commentArr = await commentData()

    let commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");

    let commentbtn = document.createElement("button");
    commentbtn.classList.add("comment-btn");
    commentbtn.innerHTML = `<i class="fa-solid fa-comment"></i> <span>View ${commentArr.length} Comments</span>`;

    let commentInput = document.createElement('div');
    commentInput.classList.add('comment-input');

    let inputComment = document.createElement('input');
    inputComment.placeholder = 'Add a comment';
    let commentBtn = document.createElement('button');
    commentBtn.innerHTML = 'Post';

    commentInput.append(inputComment);
    commentInput.append(commentBtn);

    commentBtn.addEventListener('click', ()=> {

      let comment = {
        message: inputComment.value,
        owner : {
          picture: 'https://github.com/mdo.png',
          firstName: data.first_name,
          lastName: data.last_name,
        },
        publishDate: new Date().toLocaleString(),

        }
      commentArr.push(comment);
      commentbtn.innerHTML = `<i class="fa-solid fa-comment"></i> <span>View ${commentArr.length} Comments</span>`;
      let click = true;
      addingComments(click)
      inputComment.value = '';
    })

    let commentFlag = true;
    commentbtn.addEventListener('click', ()=>{
        if(commentFlag){
            commentbtn.innerHTML = `<i class="fa-solid fa-comment"></i> <span>Hide ${commentArr.length} Comments</span>`;
            commentFlag = false;
        }
        else {
            commentbtn.innerHTML = `<i class="fa-solid fa-comment"></i> <span>View ${commentArr.length} Comments</span>`;
            commentFlag = true;
        }
        commentSection.classList.toggle('comment-display');
    })

    function addingComments (click){
      let num = click ? commentArr.length - 1 : 0;
      // console.log(num)
      for (let i = num; i < commentArr.length; i++) {

        let comment = document.createElement("div");
        comment.classList.add("comment");
    
        let commentUser = document.createElement("div");
        commentUser.classList.add("comment-user");
    
        let commentImg = document.createElement("div");
        commentImg.classList.add("comment-img");
    
        commentImg.innerHTML = `<img src="${commentArr[i].owner.picture}" alt="person">`;
    
        let comentUserInfo = document.createElement("div");
        comentUserInfo.classList.add("comment-user-info");
    
        comentUserInfo.innerHTML = `
            <h5>${commentArr[i].owner.firstName} ${commentArr[i].owner.lastName}</h5>
            <p>${commentArr[i].publishDate}</p>
            `;
        
        commentUser.append(commentImg);
        commentUser.append(comentUserInfo);
    
        let commentText = document.createElement('div');
        commentText.innerHTML = `
            <p>${commentArr[i].message}</p>
        `;

        let editBtn = document.createElement('button');
        editBtn.classList.add('edit-button');
        editBtn.innerHTML = 'edit';
        editBtn.addEventListener('click', (e)=> {
          let text = e.target.parentElement.querySelector('p:nth-child(1)').innerHTML;
          inputComment.value = text;
          inputComment.focus();
          let editedText = inputComment.value;
          let currEle =  e.target.parentElement.querySelector('p:nth-child(1)');
          currEle.innerHTML = editedText;
          e.target.parentElement.parentElement.remove()
          
        })
        
        comment.append(commentUser);
        comment.append(commentText);
        if (click){
          commentText.append(editBtn);
        }
    
        commentSection.append(comment)
        }
    }

    addingComments(false)

    // console.log(commentSection2)
    post.append(postHeader);
    post.append(postImg);
    post.append(postInfo);
    post.append(commentbtn);
    post.append(commentInput);
    post.append(commentSection);

    postSection.append(post);
  }
}

async function commentData() {
  let commentFetch = await getData(commentsapi);
  return commentFetch.data;
    
}

document
  .getElementById("scrollButtonRight")
  .addEventListener("click", function () {
    let element = document.querySelector(".stories");
    element.scrollLeft += 50; // Scroll right by 50 pixels
  });

document
  .getElementById("scrollButtonLeft")
  .addEventListener("click", function () {
    let element = document.querySelector(".stories");
    element.scrollLeft -= 50; // Scroll left by 50 pixels
  });

signOut.addEventListener('click', ()=> {
  localStorage.removeItem('logged-in');
  location.href = './index.html';
})

sideBar.addEventListener('click', (event) => {
  sideBarData.classList.toggle('side-bar-display');
});

document.body.addEventListener('click', (event) => {
  if (event.target !== sideBar && !sideBar.contains(event.target) &&
      event.target !== sideBarData && !sideBarData.contains(event.target)) {
    if (sideBarData.classList.contains('side-bar-display')) {
      sideBarData.classList.remove('side-bar-display');
    }
  }
});


userData()
postData()

window.addEventListener('scroll', () => {
  const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
  if (scrollPercentage >= 90) {
      postData()
  }
});