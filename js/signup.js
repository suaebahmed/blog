$(document).ready(function(){

    $(".btnRegister").click(function(){

        let email = $("#email").val();
        let password = $("#password").val();
        let password2 = $("#password2").val();

        if(password != '' && email != ''){
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>{
                console.log('successful')
                window.location.href = 'Home.html'
            }).catch(error=>{
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log(errorMessage)
            });
        }else{
            alert('please fill up what you see empty feilds');
        }
    });

});

