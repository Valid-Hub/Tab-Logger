import styles from '../../styles/Components/UI/status.bar.module.css';
import type PageRecord from '../../types/PageRecord';

interface StatsPanelProps {
    data: PageRecord[];
    filteredData: PageRecord[];
}

const StatusBar: React.FC<StatsPanelProps> = ({ data, filteredData }) => {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.item}>
                    <div className={styles.number}>{filteredData.length}</div>
                    <div className={styles.label}>Filtered Results</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.number}>{data.length}</div>
                    <div className={styles.label}>Total Visits</div>
                </div>
            </div>
        </div>
    );
};

export default StatusBar;
