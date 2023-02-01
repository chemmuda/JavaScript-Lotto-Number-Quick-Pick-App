const group = document.getElementById('group') 
const maxDigit = document.getElementById('maxDigit') 
const groupRules = document.getElementById('groupRules') 

/**
 * Loader Element Creation
 */
const loader = document.createElement('div')
loader.setAttribute("id", "preloader")
loader.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`


/** Show Loader to document */
window.start_loader = function(){
    if(document.querySelector('#preloader') != null)
        document.querySelector('#preloader').remove()

    document.body.appendChild(loader)
}

/** Remove Loader From Document */
window.end_loader = function(){
    if(document.querySelector('#preloader') != null)
        document.querySelector('#preloader').remove()
}

$(document).ready(function(){
    $('form#quickpick-form').submit(async function(e){
        e.preventDefault();
        $(".result").remove()
        start_loader()
        var generatedNumbers = await generateLottoNumbers();
        await displayGenerated(generatedNumbers);
        end_loader();
        
    })
})

const generateLottoNumbers = () =>{
    var strPad = maxDigit.value.length
    
    var num_arr = [];
    for(var i = 0; i < group.value; i++){
        var rand = String(Math.floor(Math.random() * (maxDigit.value - 1) + 1)).padStart(strPad, "0")
        if(groupRules.value == 1){
            while(true){
                if($.inArray(rand, num_arr) > -1){
                    rand = String(Math.floor(Math.random() * (maxDigit.value - 1) + 1)).padStart(strPad, "0")
                }else{
                    break;
                }
            }
        }
        num_arr.push(rand);
    }
    // console.log(num_arr.join("-"));
    return num_arr.join("-")
    
}

const displayGenerated = ($numbers) => {
    var el = $('<h3>')
    el.addClass("border border-1 border-success fw-bolder text-center rounded result")
    el.text($numbers)
    el.hide()
    $("form#quickpick-form").append(el)
    el.toggle()
}