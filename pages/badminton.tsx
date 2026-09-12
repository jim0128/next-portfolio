import React, { useState, useEffect } from 'react';

interface SmartPlayItem {
    District_Name_EN?: string;
    District_Name_TC?: string;
    Venue_Name_EN?: string;
    Venue_Name_TC?: string;
    Facility_Type_Name_TC?: string;
    Available_Date?: string;
    Session_Start_Time?: string;
    Session_End_Time?: string;
    Available_Courts?: string | number;
    [key: string]: any;
}

interface SessionInfo {
    court: string;
    time: string;
    date: string;
    availableCourts: number;
    isAvailable: boolean;
}

interface GroupedVenue {
    name: string;
    subArea: string;
    sessions: SessionInfo[];
}

export default function BadmintonPage() {
    const [allData, setAllData] = useState<SmartPlayItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSubArea, setSelectedSubArea] = useState<string>('全部');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [lastFetchTime, setLastFetchTime] = useState<string>('');

    // 釘選狀態
    const [pinnedVenues, setPinnedVenues] = useState<string[]>([]);

    // Modal 控制與日期選擇 State
    const [selectedVenueModal, setSelectedVenueModal] = useState<GroupedVenue | null>(null);
    const [modalDateFilter, setModalDateFilter] = useState<string>('');

    // 📌 輔助函式：將日期加上星期資訊 (例如: "2026-09-18 (Fri)" 或 "2026-09-18 (週五)")
    const formatDateWithDay = (dateStr: string) => {
        if (!dateStr) return '';
        const dateObj = new Date(dateStr);
        if (isNaN(dateObj.getTime())) return dateStr;

        // 英文星期簡寫: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        // 中文星期簡寫: ['週日', '週一', '週二', '週三', '週四', '週五', '週六']
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[dateObj.getDay()];
        return `${dateStr} (${dayName})`;
    };

    const togglePin = (venueName: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setPinnedVenues((prev) =>
            prev.includes(venueName)
                ? prev.filter((name) => name !== venueName)
                : [...prev, venueName]
        );
    };

    const handleOpenModal = (venue: GroupedVenue) => {
        setModalDateFilter(selectedDate || availableDates[0] || '');
        setSelectedVenueModal(venue);
    };

    const fetchBadmintonData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/badminton');

            if (!response.ok) throw new Error(`Proxy status: ${response.status}`);

            const rawData: SmartPlayItem[] = await response.json();
            if (!Array.isArray(rawData)) throw new Error('API data payload format mismatch');

            // Filters the decompressed array specifically for Sha Tin facilities
            const shatinData = rawData.filter((item) => {
                const districtTc = item.District_Name_TC || '';
                const districtEn = item.District_Name_EN || '';
                return districtTc.includes('沙田') || districtEn.toLowerCase().includes('sha tin');
            });

            setAllData(shatinData);
            setLastFetchTime(new Date().toLocaleTimeString());

            if (shatinData.length > 0 && !selectedDate) {
                const firstDate = shatinData[0].Available_Date || '';
                if (firstDate) {
                    setSelectedDate(firstDate);
                    setModalDateFilter(firstDate);
                }
            }
        } catch (err: any) {
            setError(`無法載入 API 數據: ${err.message || '連線錯誤'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBadmintonData();
    }, []);

    const availableDates = Array.from(
        new Set(allData.map((item) => item.Available_Date || '').filter(Boolean))
    ).sort();

    const subAreas = ['全部', '馬鞍山', '大圍', '沙田市中心/城河東'];

    const getSubArea = (venueName: string): string => {
        if (venueName.includes('馬鞍山') || venueName.includes('恒安')) return '馬鞍山';
        if (venueName.includes('顯徑') || venueName.includes('美林')) return '大圍';
        return '沙田市中心/城河東';
    };

    const groupedVenues = allData.reduce<Record<string, GroupedVenue>>((acc, item) => {
        const venueName = item.Venue_Name_TC || item.Venue_Name_EN || '未知體育館';
        const itemSubArea = getSubArea(venueName);
        const date = item.Available_Date || '';
        const facility = item.Facility_Type_Name_TC || '羽毛球場';

        const matchArea = selectedSubArea === '全部' || itemSubArea === selectedSubArea;
        const matchSearch = venueName.includes(searchTerm) || facility.includes(searchTerm);
        const matchDate = !selectedDate || date === selectedDate;

        if (matchArea && matchSearch && matchDate) {
            if (!acc[venueName]) {
                acc[venueName] = { name: venueName, subArea: itemSubArea, sessions: [] };
            }
            const courtsCount = Number(item.Available_Courts || 0);
            const timeSlot = `${item.Session_Start_Time || ''} - ${item.Session_End_Time || ''}`;

            acc[venueName].sessions.push({
                court: facility,
                time: timeSlot,
                date: date,
                availableCourts: courtsCount,
                isAvailable: courtsCount > 0,
            });
        }
        return acc;
    }, {});

    const venueList = Object.values(groupedVenues)
        .map((venue) => ({
            ...venue,
            // 每個場館內的時段按時間由早到晚排序
            sessions: [...venue.sessions].sort((a, b) => a.time.localeCompare(b.time)),
        }))
        .sort((a, b) => {
            const aIndex = pinnedVenues.indexOf(a.name);
            const bIndex = pinnedVenues.indexOf(b.name);
            const aPinned = aIndex !== -1;
            const bPinned = bIndex !== -1;

            // 1. 若兩者都被釘選，依照在 pinnedVenues 裡面的順序（先 Pin 的索引較小，排前面）
            if (aPinned && bPinned) {
                return aIndex - bIndex;
            }

            // 2. 若只有其中一個被釘選，Pinned 者優先
            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;

            // 3. 若兩者都未被釘選，依場館名稱固定排序（避免切換日期時亂跳）
            return a.name.localeCompare(b.name, 'zh-HK');
        });

    // 📌 Compute modal sessions dynamically based on the venue and selected modalDateFilter
    const modalFilteredSessions = selectedVenueModal
        ? allData
            .filter((item) => {
                const venueName = item.Venue_Name_TC || item.Venue_Name_EN || '';
                // Match both the venue name AND the active modal date filter
                return venueName === selectedVenueModal.name && item.Available_Date === modalDateFilter;
            })
            .map((item) => {
                const courtsCount = Number(item.Available_Courts || 0);
                return {
                    time: `${item.Session_Start_Time || ''} - ${item.Session_End_Time || ''}`,
                    availableCourts: courtsCount,
                    isAvailable: courtsCount > 0,
                };
            })
            .sort((a, b) => a.time.localeCompare(b.time))
        : [];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.tag}>[ SYSTEM INITIALIZED ]</div>
                <h1 style={styles.title}>
                    BADMINTON <span style={styles.highlight}>SHATIN</span>
                </h1>
                <p style={styles.subtitle}>// SmartPLAY LCSD Open Data Stream</p>
            </header>

            <section style={styles.controls}>
                <div style={styles.apiBar}>
                    <button onClick={fetchBadmintonData} disabled={loading} style={styles.refreshBtn}>
                        {loading ? '// CONNECTING...' : '// REFRESH DATA'}
                    </button>
                    {lastFetchTime && (
                        <span style={styles.timeText}>LAST_FETCH: {lastFetchTime}</span>
                    )}
                </div>

                {/* 主頁面日期選擇按鈕，加上星期 display */}
                {availableDates.length > 0 && (
                    <div style={styles.dateSelector}>
                        <span style={styles.filterLabel}>DATE_SELECT //</span>
                        {availableDates.map((date) => (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                style={{
                                    ...styles.dateBtn,
                                    ...(selectedDate === date ? styles.dateBtnActive : {}),
                                }}
                            >
                                {formatDateWithDay(date)}
                            </button>
                        ))}
                    </div>
                )}

                <div style={styles.filterRow}>
                    <input
                        type="text"
                        placeholder="Search venue name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />

                    <div style={styles.filterGroup}>
                        <span style={styles.filterLabel}>ZONE //</span>
                        {subAreas.map((area) => (
                            <button
                                key={area}
                                onClick={() => setSelectedSubArea(area)}
                                style={{
                                    ...styles.filterBtn,
                                    ...(selectedSubArea === area ? styles.filterBtnActive : {}),
                                }}
                            >
                                {area}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {loading && <p style={styles.statusMsg}>FETCHING_SMARTPLAY_DATA...</p>}
            {error && <p style={styles.errorMsg}>[ERROR] {error}</p>}

            {!loading && !error && (
                <main style={styles.grid}>
                    {venueList.length > 0 ? (
                        venueList.map((venue) => {
                            const availableCount = venue.sessions.filter((s) => s.isAvailable).length;
                            const isPinned = pinnedVenues.includes(venue.name);

                            return (
                                <div
                                    key={venue.name}
                                    onClick={() => handleOpenModal(venue)}
                                    style={{
                                        ...styles.card,
                                        ...(isPinned ? styles.pinnedCard : {}),
                                    }}
                                >
                                    <div style={styles.cardHeader}>
                                        <div style={styles.titleWrapper}>
                                            <h2 style={styles.venueName}>{venue.name}</h2>
                                            <span style={styles.areaBadge}>{venue.subArea}</span>
                                        </div>

                                        <button
                                            onClick={(e) => togglePin(venue.name, e)}
                                            style={{
                                                ...styles.pinBtn,
                                                color: '#64FFDA',
                                                backgroundColor: isPinned
                                                    ? 'rgba(100, 255, 218, 0.2)'
                                                    : 'rgba(255, 255, 255, 0.05)',
                                                borderColor: isPinned ? '#64FFDA' : 'rgba(255, 255, 255, 0.1)',
                                                boxShadow: isPinned ? '0 0 10px rgba(100, 255, 218, 0.3)' : 'none',
                                            }}
                                            title={isPinned ? 'Unpin Venue' : 'Pin to top'}
                                        >
                                            <span style={{ fontSize: '16px', lineHeight: 1 }}>
                                                {isPinned ? '★' : '☆'}
                                            </span>
                                            {isPinned ? 'PINNED' : 'PIN'}
                                        </button>
                                    </div>

                                    <div
                                        style={{
                                            ...styles.countBadge,
                                            borderColor: availableCount > 0 ? '#64FFDA' : '#FF5370',
                                            color: availableCount > 0 ? '#64FFDA' : '#FF5370',
                                        }}
                                    >
                                        {availableCount > 0
                                            ? `● AVAILABLE: ${availableCount} SESSIONS`
                                            : '○ FULLY BOOKED'}
                                    </div>

                                    <div style={styles.sessionList}>
                                        {venue.sessions.length > 0 ? (
                                            venue.sessions.map((s, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        ...styles.sessionItem,
                                                        backgroundColor: s.isAvailable
                                                            ? 'rgba(100, 255, 218, 0.05)'
                                                            : 'rgba(255, 255, 255, 0.02)',
                                                        borderColor: s.isAvailable
                                                            ? 'rgba(100, 255, 218, 0.3)'
                                                            : 'rgba(255, 255, 255, 0.05)',
                                                    }}
                                                >
                                                    <span style={styles.sessionTime}>{s.time}</span>
                                                    <span
                                                        style={{
                                                            ...styles.statusTag,
                                                            color: s.isAvailable ? '#64FFDA' : '#6B7280',
                                                        }}
                                                    >
                                                        {s.isAvailable ? `REMAINING: ${s.availableCourts}` : 'UNAVAILABLE'}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={styles.emptyText}>NO DATA</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={styles.noResult}>[0 MATCHES FOUND FOR SHATIN BADMINTON COURTS]</p>
                    )}
                </main>
            )}

            {/* 📌 Modal 彈窗 */}
            {selectedVenueModal && (
                <div style={styles.modalOverlay} onClick={() => setSelectedVenueModal(null)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>

                        <div style={styles.modalHeader}>
                            <div>
                                <h2 style={styles.modalTitle}>{selectedVenueModal.name}</h2>
                                <span style={styles.areaBadge}>{selectedVenueModal.subArea}</span>
                            </div>

                            <button
                                style={styles.closeBtnCorner}
                                onClick={() => setSelectedVenueModal(null)}
                            >
                                ✕ CLOSE
                            </button>
                        </div>

                        {/* 📌 Modal 日期下拉選單：顯示包含星期的完整格式 */}
                        <div style={styles.modalSubHeader}>
                            <div style={styles.modalDateSelector}>
                                <span style={styles.filterLabel}>DATE //</span>
                                <div style={styles.scrollWrapper}>
                                    {availableDates.map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => {
                                                setSelectedDate(date)
                                                setModalDateFilter(date)
                                            }}
                                            style={{
                                                ...styles.dateBtn,
                                                ...(selectedDate === date ? styles.dateBtnActive : {}),
                                            }}
                                        >
                                            {formatDateWithDay(date)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={styles.modalSessionList}>
                            {modalFilteredSessions.length > 0 ? (
                                modalFilteredSessions.map((s, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            ...styles.modalSessionItem,
                                            borderColor: s.isAvailable ? '#64FFDA' : 'rgba(255, 255, 255, 0.1)',
                                            backgroundColor: s.isAvailable
                                                ? 'rgba(100, 255, 218, 0.05)'
                                                : 'rgba(255, 255, 255, 0.02)',
                                        }}
                                    >
                                        <div style={styles.sessionTimeLarge}>{s.time}</div>
                                        <div
                                            style={{
                                                ...styles.statusTagLarge,
                                                color: s.isAvailable ? '#64FFDA' : '#FF5370',
                                            }}
                                        >
                                            {s.isAvailable
                                                ? `● AVAILABLE: ${s.availableCourts} COURTS`
                                                : '○ FULLY BOOKED'}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.emptyText}>NO COURTS AVAILABLE ON THIS DATE</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: '"Fira Code", "Courier New", monospace, -apple-system',
        backgroundColor: '#0B132B',
        minHeight: '100vh',
        color: '#E0E6ED',
    },
    header: { textAlign: 'center', marginBottom: '35px' },
    tag: { fontSize: '12px', color: '#64FFDA', letterSpacing: '2px', marginBottom: '8px' },
    title: { fontSize: '32px', fontWeight: '700', margin: '0 0 10px 0', color: '#FFFFFF', letterSpacing: '1px' },
    highlight: { color: '#64FFDA' },
    subtitle: { fontSize: '14px', color: '#8892B0', margin: 0 },
    controls: {
        backgroundColor: '#1C2541',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid rgba(100, 255, 218, 0.15)',
        boxShadow: '0 10px 30px -15px rgba(2,12,27,0.7)',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    apiBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' },
    refreshBtn: {
        padding: '10px 18px',
        backgroundColor: 'transparent',
        color: '#64FFDA',
        border: '1px solid #64FFDA',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px',
        fontFamily: 'inherit',
    },
    timeText: { fontSize: '12px', color: '#8892B0' },
    dateSelector: { display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' },
    dateBtn: {
        padding: '6px 14px',
        borderRadius: '4px',
        border: '1px solid #3A4767',
        backgroundColor: '#0B132B',
        color: '#8892B0',
        cursor: 'pointer',
        fontSize: '12px',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
    },
    dateBtnActive: {
        backgroundColor: 'rgba(100, 255, 218, 0.1)',
        color: '#64FFDA',
        borderColor: '#64FFDA',
        fontWeight: 'bold',
    },
    filterRow: { display: 'flex', flexDirection: 'column', gap: '14px' },
    searchInput: {
        padding: '12px 16px',
        borderRadius: '6px',
        border: '1px solid #3A4767',
        backgroundColor: '#0B132B',
        color: '#FFFFFF',
        fontSize: '14px',
        fontFamily: 'inherit',
        outline: 'none',
    },
    filterGroup: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' },
    filterLabel: { fontSize: '12px', color: '#64FFDA', whiteSpace: 'nowrap' },
    filterBtn: {
        padding: '6px 14px',
        borderRadius: '4px',
        border: '1px solid transparent',
        backgroundColor: '#0B132B',
        color: '#8892B0',
        cursor: 'pointer',
        fontSize: '12px',
        fontFamily: 'inherit',
    },
    filterBtnActive: { backgroundColor: '#3A4767', color: '#FFFFFF', borderColor: '#64FFDA' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px',
    },
    card: {
        backgroundColor: '#1C2541',
        borderRadius: '10px',
        padding: '22px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px -15px rgba(2,12,27,0.5)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    pinnedCard: {
        border: '1px solid #64FFDA',
        boxShadow: '0 0 15px rgba(100, 255, 218, 0.2)',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '14px',
        paddingRight: '80px',
    },
    titleWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        alignItems: 'flex-start',
    },
    venueName: { fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#FFFFFF' },
    areaBadge: {
        backgroundColor: 'rgba(100, 255, 218, 0.1)',
        color: '#64FFDA',
        fontSize: '11px',
        padding: '3px 8px',
        borderRadius: '4px',
        border: '1px solid rgba(100, 255, 218, 0.2)',
    },
    pinBtn: {
        position: 'absolute',
        top: '18px',
        right: '18px',
        padding: '4px 10px',
        borderRadius: '6px',
        border: '1px solid',
        fontSize: '11px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.2s ease',
    },
    countBadge: {
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        textAlign: 'center',
        marginBottom: '16px',
        border: '1px solid',
        backgroundColor: '#0B132B',
        fontWeight: 'bold',
    },
    sessionList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxHeight: '280px',
        overflowY: 'auto',
    },
    sessionItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid',
        fontSize: '12px',
    },
    sessionTime: { color: '#E0E6ED', fontWeight: '500' },
    statusTag: { fontWeight: 'bold', fontSize: '14px', paddingLeft: '8px', },
    emptyText: { textAlign: 'center', color: '#6B7280', fontSize: '12px', margin: '12px 0' },
    statusMsg: { textAlign: 'center', color: '#64FFDA', padding: '40px', fontSize: '14px' },
    errorMsg: { textAlign: 'center', color: '#FF5370', padding: '40px', fontSize: '14px' },
    noResult: { gridColumn: '1 / -1', textAlign: 'center', color: '#8892B0', padding: '60px' },

    /* Modal 樣式 */
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(11, 19, 43, 0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        boxSizing: 'border-box',
    },
    modalContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // 📌 Forces perfect geometric centering
        backgroundColor: '#1C2541',
        borderRadius: '12px',
        border: '1px solid #64FFDA',
        boxShadow: '0 0 35px rgba(100, 255, 218, 0.25)',
        width: '90vw',
        height: '85vh',
        maxWidth: '1000px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxSizing: 'border-box',
    },
    modalHeader: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    modalTitle: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: '0 0 6px 0',
    },
    closeBtnCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'transparent',
        border: '1px solid #FF5370',
        color: '#FF5370',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 'bold',
        fontSize: '13px',
        zIndex: 10,
    },
    modalSubHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '14px',
        color: '#8892B0',
    },
    modalDateSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    dateDropdown: {
        backgroundColor: '#0B132B',
        color: '#64FFDA',
        border: '1px solid #64FFDA',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        fontFamily: 'inherit',
        outline: 'none',
        cursor: 'pointer',
    },
    dateSelectorContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#0F172A',
        padding: '12px 16px',
        borderRadius: '6px',
        border: '1px solid #1E293B',
        overflow: 'hidden',
    },
    label: {
        color: '#38BDF8',
        fontFamily: "'Fira Code', monospace",
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
    },
    scrollWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
    },
    modalSessionList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        overflowY: 'auto',
        flex: 1,
        paddingRight: '6px',
    },
    modalSessionItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid',
    },
    sessionTimeLarge: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statusTagLarge: {
        fontSize: '13px',
        fontWeight: 'bold',
    },
};