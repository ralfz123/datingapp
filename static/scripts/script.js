//     var remove = document.getElementById('js-remove')

// if (remove){
//     remove.addEventListener('click', onremove)
// }

// function onremove(ev){
//     var node = ev.target
//     var id  = node.dataset.id
    
//     fetch('/' + id, {method: 'delete'})
//         .then(onresponse)
//         .then(onload, onfail)

//     function onresponse(res){
//         return res.json()
//     }

//     function onload(){
//         window.location = '/'
//     }

//     function onfail(){
//         throw new Error('Could not delete!')
//     }

// }

// wat gebeurt hier?
var fieldset = document.getElementsByTagName('fieldset');
var button = document.getElementsByTagName('button');
var li = document.getElementsByTagName('li');
var form = document.getElementsByTagName('form');
form.onsubmit =()=>{return false};


// wat gebeurt hier?
var current_fieldset = 0;
fieldset[current_fieldset].style.display = "block";
if (current_fieldset == 0){
    button[0].style.display = "none";
    li[0].style.backgroundColor = "red";
}
// wat gebeurt hier?

button[1].onclick = ()=>{
    current_fieldset++;
    var back_fieldset = current_fieldset - 1;
    if ((current_fieldset > 0) && (current_fieldset < 4)){
        button[0].style.display = "block";
        fieldset[current_fieldset].style.display = "block";
        fieldset[back_fieldset].style.display = "none";
        li[current_fieldset].style.backgroundColor = "red";
        li[back_fieldset].style.backgroundColor = "#ededed";
        if (current_fieldset == 3){
            button[1].innerHTML = "Submit";
        }
 
    } else {
        if (current_fieldset > 3){
            form.onsubmit =()=>{return true};

        }
    }
}
// wat gebeurt hier?

button[0].onclick = ()=>{
    if (current_fieldset > 0){
        current_fieldset--;
        var back_fieldset = current_fieldset + 1;
        fieldset[current_fieldset].style.display = "block";
        fieldset[back_fieldset].style.display = "none";
        li[current_fieldset].style.backgroundColor = "red";
        li[back_fieldset].style.backgroundColor = "#ededed";
        if (current_fieldset < 3){
            button[1].innerHTML = "Next";
        }

    }
    if (current_fieldset == 0){
        button[0].style.display = "none";
    }
}
