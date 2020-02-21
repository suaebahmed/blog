$(document).ready(function(){
    $(".btnSubmit").click(function(){
        var email = $('#email').val();


        if( email != ''){
            firebase.auth().sendPasswordResetEmail(email)
                   .then(()=>{

                   }).catch(err=>{
                       var errCode = err.code;
                       var errMsg = err.message;
                       console.log(errMsg)
                   })

        }else{
            window.alert('please send an email.');
        }
    })
})