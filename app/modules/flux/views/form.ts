import { store } from '../store/index';
import { View } from '../../../../modules/flux/view/index';
const flux = document.querySelector('.flux');
const form = flux.querySelector('.view-stub__input-block');
const formNode = new View(form, store.state$);

formNode.render(() => {
    return `<input class="view-stub__input" data-disabled="isSending"/><button class="view-stub__apply" data-disabled="isSending">Отправить на сервер</button>`;
});

export { formNode };


