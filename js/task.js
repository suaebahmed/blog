
    var newCol = document.getElementById('newCol');
    var rootRef = firebase.database().ref('tasks');
    var x =  document.getElementById('from-section')

    var btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.addEventListener('click',createTask);

    function createTask(){
        var title = document.getElementById('title');
        var desc = document.getElementById('desc')
    
        var autoID = rootRef.push().key;
        rootRef.child(autoID).set({
            id: autoID,
            title: title.value,
            desc: desc.value
        }).then(()=>{
            title.value = ''
            desc.value = ''
            console.log('saved')
        }).catch(err=>{
            console.log(err)
        })
    }


    rootRef.on('value', function(snapshot) {
        newCol.innerHTML = ''
        snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        newCol.innerHTML += `<div class="card">
                                <div class="card-body">
                                    <div className="card-title">
                                        <h1>${childData.title}</h1>
                                    </div>
                                    <div class="card-text">
                                        <p>${childData.desc}</p>
                                    </div>
                                    <button class="btn btn-warning" onclick="edit('${childKey}','${childData.title}','${childData.desc}')"><i class="fas fa-recycle"></i> Edit task</button>
                                    <button class="btn btn-danger" onclick="danger('${childKey}')" ><i class="fas fa-trash-alt"></i> Delete task</button>
                                </div>
                            </div>`
        });
      });
      

    function edit(id,title,desc){

        x.innerHTML = `
        <h3>Login Form</h3>

        <div class="form-group">
            <input type="text" id="title" class="form-control" placeholder="Your title *" value="${title}" />
        </div>
        <div class="form-group">
            <input type="text" id="desc" class="form-control" placeholder="Your desc *" value="${desc}" />
        </div>
        <div class="form-group">
                 <button class="btn btn-success" onclick="update('${id}','${title}','${desc}')" >Update task</button>
                 <button class="btn btn-danger" onclick="cancalUpdate()">Cancal</button>
            </div>
        `
    }

    function update(id,title,desc){
        
        var title = document.getElementById('title').value;
        var desc = document.getElementById('desc').value;

        x.innerHTML = `
        <h3>Login Form</h3>
        <div class="form-group">
            <input type="text" id="title" class="form-control" placeholder="Your title *" value="" />
        </div>
        <div class="form-group">
            <input type="text" id="desc" class="form-control" placeholder="Your desc *" value="" />
        </div>
        <div class="form-group">
        <input type="submit" class="btn btn-primary" id="btnSubmit1" value="ADD TASK" />
        </div>
        `    
        rootRef.child(id).set({
            id: id,
            title,
            desc
        }).then(()=>{
            console.log('updated')
        }).catch(err=>{
            console.log(err)
        })
        var btnSubmit = document.getElementById('btnSubmit1');
        btnSubmit.addEventListener('click',createTask);
    
    }


    function cancalUpdate(){
        x.innerHTML = `
        <h3>Login Form</h3>
        <div class="form-group">
            <input type="text" id="title" class="form-control" placeholder="Your title *" value="" />
        </div>
        <div class="form-group">
            <input type="text" id="desc" class="form-control" placeholder="Your desc *" value="" />
        </div>
        <div class="form-group">
        <input type="submit" class="btn btn-primary" id="btnSubmit1" value="ADD TASK" />
        </div>
        `
        var btnSubmit = document.getElementById('btnSubmit1');
        btnSubmit.addEventListener('click',createTask);
    }

    function danger(id){

        rootRef.child(id).remove().then(()=>{
            console.log('removed')
        }).catch(err=>{
            console.log(err)
        })
    }

{/* <i class="fas fa-recycle"></i> */}
{/* <i class="fas fa-trash-alt"></i> */}

