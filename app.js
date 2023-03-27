//constructor
shownotes();
function Book(name, author, type){
    this.name = name;
    this.author = author;
    this.type = type;
}
let notes = localStorage.getItem('notes')

//fdor dislay

function Display(){
    
    
}


//method

Display.prototype.add = function(book){
    let notes = localStorage.getItem('notes')
   
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myobj = {
        name : book.name,
        author : book.author,
        type : book.type
    }

    notesObj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    shownotes();
    
}




Display.prototype.clear = function(){
    let libraryform = document.getElementById('libraryForm')
    libraryform.reset();

}


Display.prototype.validate = function(book){
    
    if(book.name.length < 2 || book.author.length < 2)
    {
          return false;      
    }
    else{
            return true;
    }

}

Display.prototype.show = function(type , text){
    let msg = document.getElementById('message')
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show"  role="alert">
    <strong>Messge:</strong> ${text}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
    </button>
</div>`;
setTimeout(function()  {
    msg.innerHTML = ""
}, 2000);

   
}


//get data from form

let libraryform = document.getElementById('libraryForm')
libraryform.addEventListener('submit' , libraryformsubmit)


function shownotes(){
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let ui = '';
    tablebody = document.getElementById('tableBody');
    notesObj.forEach(function(element , index) {
        
        ui += `<tr>
       <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td> <button id= '${index}' onclick = "deleteNote(this.id)" class="fas fa-trash"></button></td>

     </tr>`;
     tablebody.innerHTML = ui;
    
    });
  
    
}

function deleteNote(index) {
    //console.log('deleted note', index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    shownotes();
    location.reload()

}



function libraryformsubmit(e){
    e.preventDefault()
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById('fiction')
    let selfhelp = document.getElementById('selfhelp')
    let philosophy = document.getElementById('philosophy')


    //local storaged
    

    if(fiction.checked){
        type = fiction.value
    }
    else if(selfhelp.checked){
        type = selfhelp.value
    }

    else if(philosophy.checked){
        type = philosophy.value
    }





    // console.log('this is click');
    let book = new Book(name, author, type)
    console.log(book);


    let display = new Display()

    if(display.validate(book)){

            display.add(book);
            display.clear();
            display.show('success' , 'book added successfully');
    }  
    else{
        display.show('danger' , 'sorry you have to fill all the field')
    } 


    e.preventDefault()
}
