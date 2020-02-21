$(document).ready(function(){
    $(".btnSubmit").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(password)

    firebase.auth().signInWithEmailAndPassword(email,password)
                    .then(()=>{
                        console.log('login succeccful')
                    })
                    .catch(err=>{
                        console.log('error login')
                    })
                    
    });

})
