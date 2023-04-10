import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            margin-top: 20px;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            //XMLHttpRequest

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // //если json то уже нужен заголовок 
            // request.setRequestHeader('Content-type', 'application/json');

            // const formData = new FormData(form);

            // const obj = {};
            // formData.forEach(function (value, key) {
            //     obj[key] = value;
            // });

            // const json = JSON.stringify(obj);

            // request.send(json); // надо поменять formData на json 

            //         request.addEventListener('load', () => {
            //             if (request.status === 200) {
            //                 console.log(request.response); //response - ответ от сервера 
            //                 showThanksModal(message.success);
            //                 form.reset();
            //                 statusMessage.remove();
            //             } else {
            //                 showThanksModal(message.failure);
            //             }
            //         });
            //     });
            // };


            //Fetch

            //         const formData = new FormData(form);

            //         fetch('server.php', {
            //             method: 'POST',
            //             body: formData
            //         }).then(data => data.text())
            //             .then(data => {
            //                 console.log(data);
            //                 showThanksModal(message.success);
            //                 statusMessage.remove();
            //             }).catch(() => {
            //                 showThanksModal(message.failure);
            //             }).finally(() => {
            //                 form.reset();
            //             });
            //     })
            // };

            //Fetch (json)

            const formData = new FormData(form);

            // const obj = {};
            // formData.forEach(function (value, key) {
            //     obj[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        })
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class='modal__content'>
            <div class='modal__close' data-close>×</div>
            <div class='modal__title'>${message}</div>
        </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 3000);
    };
};

export default forms;