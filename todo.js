document.addEventListener("DOMContentLoaded",() => {

    let selectedColor = null;

    document.querySelector('h2').innerHTML = "Empty list";
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
            };
        }
    });
});