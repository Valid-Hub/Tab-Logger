import styles from '../../styles/Components/Layouts/navbar.module.css';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.content}>
                <div className={styles.leftSection}>
                    <span className={styles.brandName}>Tab-Logger</span>
                </div>

                <div className={styles.rightSection}>
                    <div className={styles.navLinks}>
                        <a href="/visited" className={styles.navLink}>
                            Visited Pages
                        </a>
                        <a href="/deleted" className={styles.navLink}>
                            Deleted Pages
                        </a>
                    </div>

                    <div className={`${styles.mobileMenuWrapper} ${menuOpen ? styles.menuOpen : ''}`}>
                        <div className={styles.mobileNavLinks}>
                            <a href="/visited" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                                Visited Pages
                            </a>
                            <a href="/deleted" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                                Deleted Pages
                            </a>
                        </div>
                    </div>

                    <button
                        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                        <div className={styles.bar}></div>
                    </button>
                </div>
            </div>
        </nav>
    );
}
