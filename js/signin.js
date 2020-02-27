$(document).ready(function(){
    $(".btnSubmit").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();

    firebase.auth().signInWithEmailAndPassword(email,password)
                    .then(()=>{
                        console.log('login succeccful')
                        window.location.href = '/'
                    })
                    .catch(err=>{
                        console.log('error login')
                    })
                    
    });

})
