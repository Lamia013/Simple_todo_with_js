//in planning: delete task, task limit
//current: local storage implement- add color
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

        document.querySelector('#list').append(li);
        document.querySelector('#task').value = '';

        document.querySelector('#button').disabled = true;
        document.querySelector('h2').innerHTML = "";
        
        list.push(task.toUpperCase());
        localStorage.setItem('list', JSON.stringify(list));

    }

    if(list.length !== 0){        
        document.querySelector('h2').innerHTML = "";
        list.forEach(task => {
            let li = document.createElement('li');
            li.textContent = task;
            document.querySelector('#list').append(li);
        });
    }
    
    document.querySelector('#button').disabled = true;
    document.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
    })

    document.querySelector('#task').onkeyup = () => {

        const hasText = document.querySelector('#task').value.length > 0;

        document.querySelector('#button').disabled = !hasText;
        document.querySelectorAll('button').forEach((button) => {
            if(button.id !== 'button') 
            {
                button.disabled = !hasText;
            }
        });
    }

    document.querySelector('form').onsubmit = () => {
        createTask();
        document.querySelectorAll('button').forEach((button) => {
            if(button.id !== 'button') 
            {
                button.disabled = true;
                selectedColor = null;
            }
        });
        return false;
    }
    document.querySelectorAll('button').forEach((button) => {
        if(button.id !== 'button') 
        {  
            button.onclick = () => {
                selectedColor = button.dataset.color; 
                document.querySelector('#task').focus();
                //list.push(selectedColor());
                //localStorage.setItem('list', JSON.stringify(list));

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