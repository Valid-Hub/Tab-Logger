import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import type PageRecord from '../types/PageRecord';
import PageTable from '../components/UI/PageTable';
import FilterBar from '../components/UI/FilterBar';
import styles from '../styles/pages/deleted.pages.module.css';
import StatusBar from '../components/UI/StatusBar';

const DeletedPages: React.FC = () => {
    const [data, setData] = useState<PageRecord[]>([]);
    const [browserFilter, setBrowserFilter] = useState('');
    const [urlFilter, setUrlFilter] = useState('');

    useEffect(() => {
        fetch(`${API_BASE_URL}?action=getDeleted`)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

    const filteredData = data.filter((row) => {
        return (browserFilter === '' || row.browser_name === browserFilter) && row.page_url.toLowerCase().includes(urlFilter.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>DELETED PAGES</h1>
                <div className={styles.divider}></div>
                <p className={styles.subtitle}>Track and manage your browsing history with style and precision</p>
            </header>

            <FilterBar
                table="getBrowsersFromDeleted"
                browserFilter={browserFilter}
                onBrowserChange={setBrowserFilter}
                urlFilter={urlFilter}
                onUrlChange={setUrlFilter}
            />
            <PageTable pageType="delete" data={filteredData} />

            <StatusBar data={data} filteredData={filteredData} />
        </div>
    );
};

export default DeletedPages;
