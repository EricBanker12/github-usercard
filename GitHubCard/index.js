/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/ericbanker12').then(obj=>{
    cards.appendChild(createCard(obj.data))
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

//let data = {
//     avatar_url: "https://avatars3.githubusercontent.com/u/13811826?v=4",
//     bio: null,
//     blog: "",
//     company: null,
//     created_at: "2015-08-15T17:19:22Z",
//     email: null,
//     events_url: "https://api.github.com/users/EricBanker12/events{/privacy}",
//     followers: 4,
//     followers_url: "https://api.github.com/users/EricBanker12/followers",
//     following: 5,
//     following_url: "https://api.github.com/users/EricBanker12/following{/other_user}",
//     gists_url: "https://api.github.com/users/EricBanker12/gists{/gist_id}",
//     gravatar_id: "",
//     hireable: null,
//     html_url: "https://github.com/EricBanker12",
//     id: 13811826,
//     location: null,
//     login: "EricBanker12",
//     name: "Eric Banker",
//     node_id: "MDQ6VXNlcjEzODExODI2",
//     organizations_url: "https://api.github.com/users/EricBanker12/orgs",
//     public_gists: 0,
//     public_repos: 25,
//     received_events_url: "https://api.github.com/users/EricBanker12/received_events",
//     repos_url: "https://api.github.com/users/EricBanker12/repos",
//     site_admin: false,
//     starred_url: "https://api.github.com/users/EricBanker12/starred{/owner}{/repo}",
//     subscriptions_url: "https://api.github.com/users/EricBanker12/subscriptions",
//     type: "User",
//     updated_at: "2019-09-05T12:51:42Z",
//     url: "https://api.github.com/users/EricBanker12",
// }

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

//cards.appendChild(createCard(data))

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['DevWarr', 'Wais-A', 'markgowen', 'Mister-Kay', 'brudnak'];

// followersArray.forEach(name=>{
//     axios.get(`https://api.github.com/users/${name}`).then(obj=>{
//         cards.appendChild(createCard(obj.data))
//     })
// })

axios.get('https://api.github.com/users/EricBanker12/followers')
    .then(obj=>{
        //console.log(obj)
        return obj.data.map(e=>e.login)
    })
    .then(followers => {
        followers.forEach(name=>{
            axios.get(`https://api.github.com/users/${name}`).then(obj=>{
                cards.appendChild(createCard(obj.data))
            })
        })
    })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(data) {
    // helper function
    function createElement(tag, attr={}) {
        let temp = document.createElement(tag)
        for (let attribute of Object.keys(attr)) {
            temp[attribute] = attr[attribute]
        }
        return temp
    }
    // card
    let card = createElement('div', {className:'card'})
    // img
    let img = createElement('img', {src:data.avatar_url})
    card.appendChild(img)
    // card-info
    let cardInfo = createElement('div', {className:'card-info'})
    card.appendChild(cardInfo)
    // name
    let name = createElement('h3', {className:'name', textContent:data.name||data.login})
    cardInfo.appendChild(name)
    // username
    let username = createElement('p', {className:'username', textContent:data.login})
    cardInfo.appendChild(username)
    // location
    let location = createElement('p', {textContent:`Location: ${data.location||'private'}`})
    cardInfo.appendChild(location)
    // profile
    let profile = createElement('p')
    let profileLink = createElement('a', {href:data.html_url, textContent:data.html_url})
    profile.appendChild(profileLink)
    cardInfo.appendChild(profile)
    // followers
    let followers = createElement('p', {textContent:`Followers: ${data.followers}`})
    cardInfo.appendChild(followers)
    // following
    let following = createElement('p', {textContent:`Following: ${data.following}`})
    cardInfo.appendChild(following)
    // bio
    let bio = createElement('p', {textContent:`Bio: ${data.bio||'N.A.'}`})
    cardInfo.appendChild(bio)

    return card
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
