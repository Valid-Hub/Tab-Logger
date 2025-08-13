import React, { useEffect, useState } from 'react';
import styles from '../../styles/Components/UI/filter.bar.module.css';
import { Search, Filter } from 'lucide-react';
import { API_BASE_URL } from '../../config';

interface FilterBarProps {
    table: string;
    browserFilter: string;
    onBrowserChange: (value: string) => void;
    urlFilter: string;
    onUrlChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ table, browserFilter, onBrowserChange, urlFilter, onUrlChange }) => {
    const [browsers, setBrowsers] = useState<string[]>([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}?action=${table}`)
            .then((res) => res.json())
            .then((data) => setBrowsers(data))
            .catch((err) => console.error('Error fetching browsers:', err));
    }, [table]);

    return (
        <div className={styles.container}>
            <div className={styles.pageFilter}>
                <label className={styles.label}>Search Pages</label>
                <div className={styles.inputWrapper}>
                    <Search className={styles.icon} />
                    <input
                        type="text"
                        value={urlFilter}
                        onChange={(e) => onUrlChange(e.target.value)}
                        placeholder="Filter by URL or title..."
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.browserSelect}>
                <label className={styles.label}>Browser</label>
                <div className={styles.inputWrapper}>
                    <Filter className={styles.icon} />
                    <select value={browserFilter} onChange={(e) => onBrowserChange(e.target.value)} className={styles.select}>
                        <option value="">All Browsers</option>
                        {browsers.map((browser) => (
                            <option key={browser} value={browser}>
                                {browser}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
