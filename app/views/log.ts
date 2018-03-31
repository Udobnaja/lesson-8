import {store} from "../store/index";
import {View} from "../../modules/flux/view/index";

const label = document.querySelector('.view-stub__label');
const LogNode = new View(label, store.state$);

LogNode.render('data');