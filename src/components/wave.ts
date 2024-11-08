import WaveFilter from '../filters/wave';
import Manager from '../manager';
import Component from './base';

export default class extends Component {
    setup(manager: Manager) {
        const waveFilter = new WaveFilter(5);

        manager.filters.push(waveFilter);

        manager.ticker.add((_delta) => {
            for (let i = 2; i < waveFilter.maxSize; i += 3) {
                if (waveFilter.status[i] == -1) continue;

                waveFilter.status[i] += waveFilter.speed / 100;

                if (waveFilter.status[i] > 1) {
                    waveFilter.status[i] = -1;
                }
            }
        });

        manager.view.addEventListener?.('click', (ev) => {
            waveFilter.status[waveFilter.index++] = ev.clientX;
            waveFilter.status[waveFilter.index++] = ev.clientY;
            waveFilter.status[waveFilter.index++] = 0;
            waveFilter.index %= waveFilter.maxSize;
        });
    }

    updateConfig() {
        throw new Error('Method not implemented.');
    }
}
