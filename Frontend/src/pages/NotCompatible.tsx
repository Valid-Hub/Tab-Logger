import styles from '../styles/Pages/not.compatible.module.css';

const NotCompatible = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Nem kompatibilis</h2>
                <p className={styles.message}>Ez a weboldal nem kompatibilis ezzel a képernyőmérettel.</p>
            </div>
        </div>
    );
};

export default NotCompatible;
