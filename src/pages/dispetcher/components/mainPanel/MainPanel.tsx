import { YMaps, Map } from '@pbe/react-yandex-maps';
import styles from "./MainPanel.module.scss";
import '../../styleDispetcer.css'
export const MainPanel = () => (
  <div className="component2">
    <div className={styles.main}>
      Карта маршрута
      <YMaps>
        <div style={{ width: '100%', height: '100vh', alignItems: 'center' }}>
          <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            style={{ width: '100%', height: '100%', alignItems: 'center' }}
          />
        </div>
      </YMaps>
    </div>
  </div>
    );

    export default MainPanel;