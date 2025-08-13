import React from 'react';
import styles from '../../styles/Components/UI/page.table.module.css';
import { Globe, Calendar, ExternalLink } from 'lucide-react';
import type PageRecord from '../../types/PageRecord';

interface PageTableProps {
    data: PageRecord[];
    pageType: string;
}

const PageTable: React.FC<PageTableProps> = ({ data, pageType }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Globe className="w-5 h-5" />
                Page History ({data.length} records)
            </div>

            <div className={styles.content}>
                {data.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className={styles.emptyStateTitle}>No pages found</p>
                        <p className={styles.emptyStateSubtitle}>Try adjusting your filters</p>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th className={styles.th}>Page</th>
                                <th className={styles.th}>Browser</th>
                                <th className={styles.th}>
                                    {pageType == 'delete' && <>Deletion Time</>}
                                    {pageType == 'visit' && <>Last Visit</>}
                                </th>
                                <th className={styles.th} style={{ textAlign: 'center' }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {data.map((row, index) => (
                                <tr key={row.id} className={styles.tr}>
                                    <td className={styles.td}>
                                        <div className={styles.pageInfo}>
                                            <div className={styles.pageTitle}>{row.page_title}</div>
                                            <div className={styles.pageUrl}>{row.page_url}</div>
                                        </div>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={styles.browserBadge}>{row.browser_name}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className={styles.date}>
                                            <Calendar className="w-4 h-4" />
                                            {pageType == 'visit' && <span className={styles.dateText}>{row.visit_time}</span>}
                                            {pageType == 'delete' && <span className={styles.dateText}>{row.delete_time}</span>}
                                        </div>
                                    </td>
                                    <td className={`${styles.td} ${styles.action}`}>
                                        <a href={row.page_url} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                                            <ExternalLink className="w-4 h-4" />
                                            Visit
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PageTable;
