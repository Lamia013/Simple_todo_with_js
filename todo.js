document.addEventListener("DOMContentLoaded",() => {
    document.querySelector('#button').disabled = true;

    document.querySelector('#task').onkeyup = () => {
        document.querySelector('#button').disabled = false;

        if(document.querySelector('#task').value.length >0)
        {
            document.querySelector('#button').disabled = false;
        }
        else
        {
            document.querySelector('#button').disabled = true;
        }
    }

    document.querySelector('form').onsubmit = () => {
        let task = document.querySelector('#task').value;
        let li = document.createElement('li');

        li.innerHTML = task.toUpperCase();

        document.querySelector('#list').append(li);
        document.querySelector('#task').value = '';

        document.querySelector('#button').disabled = true;
        return false;
    }
});