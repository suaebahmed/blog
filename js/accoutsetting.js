$(document).ready(()=>{


    $('.btnSubmit').click(function(){
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var country = $("#country").val();
    
        // console.log(name,email,phone,country)
    
        if(name != '' && email != '' && phone != '' && country != '' ){
            // var rootRef = firebase.database().ref('check').child("Users");
            // var userId = firebase.auth().currentUser.uid;
    
            // var userRef = rootRef.child(userId);
            var x = firebase.database().ref('users/'+firebase.auth().currentUser.uid);
            var newUser = {
                "name": name,
                "email": email,
                "phone": phone,
                "country": country
            }
            x.set(newUser,function(error){
                if(error){
                    var errCode = error.code;
                    var errMsg = error.message;
                    window.alert('Error ',errMsg +' and '+ errCode);
                }else{
                    // window.location.href = 'Home.html'
                    console.log('data is saved')
                }
            })
        }else{
            window.alert('please fill up all the feilds');
        }
    });

    var starCountRef = firebase.database().ref('users');
    starCountRef.on('value', function(snapshot) {
    // updateStarCount(postElement, snapshot.val());
    console.log(snapshot)
    console.log(snapshot.val())
    });


})