const API_BASE_URL = 'http://localhost/tablogger/api.php';

function getBrowserName() {
    const ua = navigator.userAgent.toLowerCase();

    const isBrave = navigator.brave?.isBrave?.() ?? false;
    if (isBrave) return 'Brave';

    if (ua.includes('opr') || ua.includes('opera')) return 'Opera';
    if (ua.includes('chrome')) return 'Chrome';
    if (ua.includes('firefox')) return 'Firefox';
    if (ua.includes('safari')) return 'Safari';
    return 'Unknown';
}

export { API_BASE_URL, getBrowserName };
