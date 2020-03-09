const names = ["ralf", 'guus', 'janno'     ]
let age=10   ;

var remove = document.getElementById('js-remove')

if (remove){
    remove.addEventListener('click', onremove)
}

function onremove(ev){
    var node = ev.target
    var id  = node.dataset.id
    
    fetch('/' + id, {method: 'delete'})
        .then(onresponse)
        .then(onload, onfail)

    function onresponse(res){
        return res.json()
    }

    function onload(){
        window.location = '/'
    }

    function onfail(){
        throw new Error('Could not delete!')
    }

}
// var res = new XMLHttpRequest()

// res.open('DELETE', '/' + id)
// res.onload = onload
// res.send()

// function onload(){
//     if (res.status !== 200){
//         throw new Error ('Could not delete!')
//     }

//     window.location = '/detail'
// }