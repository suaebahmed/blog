$(document).ready(function(){
    $("#logoutBtn").click(function(){
        firebase.auth().signOut()
        .then(()=>{
            window.location.href = 'Home.html'
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
})