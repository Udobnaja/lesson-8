import { store } from '../store/index';
import { View } from '../../modules/flux/view/index';

const label = document.querySelector('.view-stub__label');
const logNode = new View(label, store.state$);

logNode.render(() => {
    return `<div data-bind="data"></div>`;
});

export { logNode };
