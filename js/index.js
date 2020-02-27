$(document).ready(function(){
    $("#logoutBtn").click(function(){
        firebase.auth().signOut()
        .then(()=>{
            console.log('you logout')
        })
        .catch(err=>{
            console.log(err)
        })
    });
    $("#deleteBtn").click(function(){
       var u = firebase.auth().currentUser;
       u.delete().then(()=>{
            console.log('your account is deleted.')
       })
       .catch(err=>{
        console.log(err.message);
       })
    })

//  ----------------------- blog  ------------------------------
    var counter = 0;
    var rootSRef = firebase.storage().ref('Blog_img');
    var rootDRef = firebase.database().ref('Blogs');


    var textarea = document.getElementById('textarea');
    var fileElement =document.getElementById("file");
    var submitBtn = document.getElementById('submitBtn');
    var progressInner = document.getElementById('progressInner');
    var progressText = document.getElementById('progressBarText');
    var title = document.getElementById('title')


    var imgDiv = document.getElementById('img');
    var newImg = new Image()
    var file;

    fileElement.addEventListener('change',function(e){
      var reader = new FileReader();
      file =fileElement.files[0]
      reader.onload = function(){
        newImg.src = reader.result;
        newImg.style.height = 250 + 'px';
        imgDiv.style.margin = 'auto'
        imgDiv.appendChild(newImg)
      }
      reader.readAsDataURL(file);
    })

    submitBtn.addEventListener('click',uploadFile)
    function   uploadFile(e){
          var storageRef = firebase.storage().ref('Blog_img/'+file.name)
      // save into storage 
          var task = storageRef.put(file);
          task.on('state_changed',function(snapshot){
                var percentage =  ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                progressInner.style.width = percentage.toFixed(2) +'%'
                progressText.innerText = percentage.toFixed(2) + '%'
          },function(err){
            console.log(err)
          },function(){
      // get url
            storageRef.getDownloadURL()
            .then(url=>{
      // save into database
                  var user = firebase.auth().currentUser
                  if(user){
                    var userName = user.displayName;
                    var userEmail = user.email;
                    var userId = user.uid
                  }

                  rootDRef.child(rootDRef.push().key).set({
                  counter: ++ counter,
                  title: title.value,
                  text: textarea.value,
                  imgPath: url ,
                  uid: userId,
                  name: userName,
                  time: new Date().toLocaleString('en-US',{hour: 'numeric',minute: 'numeric',hour12: true}),
                  date: new Date().toLocaleDateString('en-US',{weekday: 'long',month: 'long',day: "2-digit",year: 'numeric'})

                },function(err){
                  if(err)
                    console.log(err)
                  else{
                    console.log('data saved')
                  }
                })
            }).catch(err=>{
              console.log(err);
            })
        })
};
//_______________________________________________________________________________________________
  function  retiveData(){
      var cardSection = document.getElementById('cardSection');
      var sortRef = rootDRef.orderByChild('counter')

        sortRef.on('value',snapshot=>{
        cardSection.innerHTML = ''
        snapshot.forEach(data=>{
        var val = data.val();
        counter ++;
        cardSection.innerHTML += `<div id="card" class="card mb-3 justify-content-md-center" style="width: 500px; height: auto">
                                      <img class="card-img-top" src="${val.imgPath}" alt="Card image cap" width="300px" height="280px">
                                       <div class="card-body">
                                        <h5 class="card-title">${val.text}</h5>
                                        <p class="card-text">This is This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                      </div>
                                    </div>`

        })
      })
  }
  retiveData();
})
