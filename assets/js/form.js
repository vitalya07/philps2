const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        bindPostData(form)
    })
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type':'application/json',
            },
            body: data
        });
        
        return await res.json();
    };
    function bindPostData(form) {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const modalError = document.querySelector('.modal__error');
            const modalSucces = document.querySelector('.modal__succes');
            const modalWindow = document.querySelector('.modal');
            const formData = new FormData(form);
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            postData('mail.php', JSON.stringify(object))
            .then(()=> {
                modalSucces.classList.remove('modal-hide');
                modalSucces.classList.add('modal-show');
                modalWindow.classList.add('modal-hide');
                setTimeout(()=> {
                    modalSucces.classList.remove('modal-show');
                    modalSucces.classList.add('modal-hide');
                }, 2000)
            })
            .catch(()=> {
                modalError.classList.remove('modal-hide');
                modalError.classList.add('modal-show');
                modalWindow.classList.add('modal-hide');
                setTimeout(()=> {
                    modalError.classList.remove('modal-show');
                    modalError.classList.add('modal-hide');
                }, 2000)
            })          
            .finally(()=> {
                form.reset();
            })  
        })
    }

