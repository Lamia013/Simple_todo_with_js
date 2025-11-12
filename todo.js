document.addEventListener("DOMContentLoaded",() => {

    let list = JSON.parse(localStorage.getItem('list')) || [];
    let selectedColor = null;

    function createTask(){
        let task = document.querySelector('#task').value;
        let li = document.createElement('li');

        li.innerHTML = task.toUpperCase();
        if(selectedColor)
        {
            li.style.color = selectedColor;
        }
        li.innerHTML=li.innerHTML +'<button class="remove">Remove</button>';
        document.querySelector('#list').append(li);
        document.querySelector('#task').value = '';

        document.querySelector('#button').disabled = true;
        document.querySelector('h2').innerHTML = "";
        
        list.push({
            text: task.toUpperCase(),
            color: selectedColor || 'black'
        });
        localStorage.setItem('list', JSON.stringify(list));

    }
    function checkLimit()
    {
        if(list.length >= 10)
        {
            document.querySelector('#limit').innerHTML = "Sorry! Maximum 10 tasks can be listed only."; 
            document.querySelector('form').style.display = 'none'; 
        }
    }

    if(list.length !== 0){ 
        document.querySelector('h2').innerHTML = "";
        list.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item.text;
            li.style.color = item.color;
            li.innerHTML=li.innerHTML +'<button class="remove">Remove</button>';
            document.querySelector('#list').append(li);
        });
    }
    checkLimit();
    
    document.querySelector('#button').disabled = true;
    document.querySelectorAll('button').forEach((button) => {
        if(!button.classList.contains('remove'))
        {
            button.disabled = true;
        }
    })

    document.querySelector('#task').onkeyup = () => {

        const hasText = document.querySelector('#task').value.length > 0;

        document.querySelector('#button').disabled = !hasText;
        document.querySelectorAll('button').forEach((button) => {
            if(button.id !== 'button' && !button.classList.contains('remove'))
            {
                button.disabled = !hasText;
            }
        });
    }

    document.querySelector('form').onsubmit = () => {
        checkLimit();
        createTask();      
        document.querySelectorAll('button').forEach((button) => {
            if(button.id !== 'button' && !button.classList.contains('remove'))
            {
                button.disabled = true;
                selectedColor = null;
            }
        });
        return false;
    }
    document.querySelectorAll('button').forEach((button) => {
        if(button.id !== 'button' && !button.classList.contains('remove'))
        {  
            button.onclick = () => {
                selectedColor = button.dataset.color; 
                document.querySelector('#task').focus();
            };
        }
    });

    document.querySelector('#clear').onclick = () =>{
        localStorage.clear();
        location.reload();
    }
    document.querySelector('#refresh').onclick = () =>{
        location.reload();
    }

    document.addEventListener('click', event =>{
        const element = event.target;
        if(element.className === 'remove')
        {
            element.parentElement.style.animationPlayState = 'running';
            element.parentElement.addEventListener('animationend', ()=>{
                const tName = element.parentElement.firstChild.textContent.trim();
                list = list.filter(item => item.text !== tName);
                localStorage.setItem('list',JSON.stringify(list));
                element.parentElement.remove();
                if (list.length === 0)
                {
                    location.reload();
                }
            });
        }
    })
});

window.onscroll = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight)
    {
        document.querySelector('body').style.background = 'orange';
    }
    else
    {
        document.querySelector('body').style.background = 'white';
    }
}