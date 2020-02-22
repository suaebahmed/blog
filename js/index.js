$(document).ready(function(){
    $("#logoutBtn").click(function(){
        firebase.auth().signOut()
        .then(()=>{
            window.location.href = 'index.html'
        })
        .catch(err=>{
            console.log(err)
        })
    });
    $("#deleteBtn").click(function(){
       var user= firebase.auth().currentUser;
       user.delete().then(()=>{
            console.log('your account is deleted.')
       })
       .catch(err=>{
        console.log(err.message);
       })
    })
    //  ----------------------- blog  --------------
    var textarea = document.getElementById('textarea');
    var fileElement =document.getElementById("file");
    var submitBtn = document.getElementById('submitBtn');
    var progressBar = document.getElementById('progressB');
    var imgDiv = document.getElementById('img');
    var img = new Image()

    submitBtn.addEventListener('click',function(e){
          var reader = new FileReader();
          var file =fileElement.files[0]
          reader.onload = function(){
            img.src = reader.result;
            img.style.width = 150+ 'px';
            img.style.height = 150 + 'px';
            imgDiv.appendChild(img)
          }
          reader.readAsDataURL(file);


// upload image in storage

          var storageRef = firebase.storage().ref('Blog_img/'+file.name)
          var task = storageRef.put(file);
          task.on('state_changed',function(snapshot){
                var percentage =  ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                progressBar.value = percentage
          },function(err){
            console.log(err)
          },function(){



//  save data is realtime database

            console.log('complate file upload');
            var imgPath = storageRef.getDownloadURL()
            .then(url=>{
                var databaseRef = firebase.database().ref('Blogs/'+firebase.auth().currentUser.uid).set({
                  text: textarea.value,
                  imgPath: url 
                },function(err){
                  if(err)
                    console.log(err)
                  console.log('data saved')
                })
            }).catch(err=>{
              console.log(err);
            })
        })

});

//_______________________________________________________________________________________________

    var download = document.getElementById('download');
    download.addEventListener('click',function(e){

      firebase.storage().ref('Blog_img/20190530_171022.jpg').getDownloadURL().then(function(url){
        //  console.log(url)
      })
      firebase.storage().ref('Blog_img/20190530_171022.jpg').getMetadata().then(function(matadata){
        // console.log(matadata)
     })
    //  var desertRef = storageRef.child('images/desert.jpg');
    //  desertRef.delete().then(function() {
    //  }).catch(function(error) {
    //  });
     
var listRef = firebase.storage().ref('Blog_img');

listRef.listAll().then(function(res) {
  console.log(res)
  res.prefixes.forEach(function(folderRef) {
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.
    // console.log(folderRef)
  });
  res.items.forEach(function(itemRef) {
    // All the items under listRef.
    // console.log(itemRef)
    // var x=itemRef.location.path_
    // firebase.storage().ref(x).getDownloadURL().then(function(url){
    //    console.log(url)
    // })
  });
}).catch(function(error) {
  // Uh-oh, an error occurred!
  console.log(error)
});


    })
    

})
