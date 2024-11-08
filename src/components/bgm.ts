import BGM from '../../assets/bgm.mp3';

import decode from '../decode';
import Manager from '../manager';
import Component from './base';

export default class extends Component {
    setup(manager: Manager) {
        const audio = new Audio(decode(BGM));

        audio.autoplay = true;
        audio.loop = true;

        manager.view.appendChild(audio);
    }

    updateConfig() {
        throw new Error('Method not implemented.');
    }
}
