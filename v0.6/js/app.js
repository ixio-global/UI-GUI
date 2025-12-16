/**
 * ixi-O O&M Admin - Common JavaScript
 */

// =========================
// Menu Structure Definition
// =========================
const MENU_STRUCTURE = {
    "상품 운영": {
        icon: "📦",
        items: {
            "상품 관리": {
                items: ["상품 기준 정보"],
                links: { "상품 기준 정보": "product-info.html" }
            },
            "고객사 관리": {
                items: ["고객사 정보", "계약 관리"],
                links: { "고객사 정보": "#", "계약 관리": "#" }
            },
            "대시보드": {
                items: ["사업 실적", "학습데이터 수집"],
                links: { "사업 실적": "index.html", "학습데이터 수집": "#" }
            }
        }
    },
    "서비스 운영": {
        icon: "⚙️",
        items: {
            "사용자 관리": {
                items: ["계정 관리"],
                links: { "계정 관리": "#" }
            },
            "구독 관리": {
                items: ["구독 현황"],
                links: { "구독 현황": "#" }
            },
            "DevOps": {
                items: ["On-Device AI 모델", "Cloud AI 기능", "서비스 연동 관리"],
                links: { 
                    "On-Device AI 모델": "#", 
                    "Cloud AI 기능": "cloud-ai.html", 
                    "서비스 연동 관리": "integration.html" 
                }
            },
            "Support Center": {
                items: ["공지/SOP/FAQ", "고객사 지원"],
                links: { "공지/SOP/FAQ": "support.html", "고객사 지원": "support.html" }
            }
        }
    },
    "서비스 정산": {
        icon: "💰",
        items: {
            "청구/수납": {
                items: ["정산 현황", "청구서 관리"],
                links: { "정산 현황": "billing.html", "청구서 관리": "billing.html" }
            }
        }
    },
    "일반": {
        icon: "🔧",
        items: {
            "시스템": {
                items: ["보안/컴플라이언스", "설정"],
                links: { "보안/컴플라이언스": "#", "설정": "#" }
            },
            "마이페이지": {
                items: ["내 정보", "비밀번호 변경"],
                links: { "내 정보": "mypage.html", "비밀번호 변경": "mypage.html" }
            }
        }
    }
};

// Current navigation state
let currentTop = "상품 운영";
let currentL2 = "";
let currentL3 = "";

// =========================
// Initialize Application
// =========================
function initApp(topMenu, l2Menu, l3Menu) {
    currentTop = topMenu || "상품 운영";
    currentL2 = l2Menu || "";
    currentL3 = l3Menu || "";
    
    renderTopNav();
    renderSidebar();
    updateBreadcrumb();
}

// =========================
// Render Top Navigation
// =========================
function renderTopNav() {
    const topNav = document.querySelector('.top-nav');
    if (!topNav) return;
    
    topNav.innerHTML = '';
    
    Object.keys(MENU_STRUCTURE).forEach(label => {
        const item = document.createElement('div');
        item.className = 'top-nav-item' + (label === currentTop ? ' active' : '');
        item.textContent = label;
        item.setAttribute('data-label', label);
        item.onclick = () => handleTopNavClick(label);
        topNav.appendChild(item);
    });
}

function handleTopNavClick(label) {
    currentTop = label;
    currentL2 = "";
    currentL3 = "";
    
    // Get first menu item link
    const menuData = MENU_STRUCTURE[label];
    if (menuData && menuData.items) {
        const firstL2 = Object.keys(menuData.items)[0];
        if (firstL2) {
            const l2Data = menuData.items[firstL2];
            if (l2Data.items && l2Data.items.length > 0) {
                const firstL3 = l2Data.items[0];
                const link = l2Data.links[firstL3];
                if (link && link !== '#') {
                    window.location.href = link;
                    return;
                }
            }
        }
    }
    
    renderTopNav();
    renderSidebar();
    updateBreadcrumb();
}

// =========================
// Render Sidebar
// =========================
function renderSidebar() {
    const sidebarTitle = document.getElementById('sidebar-title');
    const sidebarMenu = document.getElementById('sidebar-menu');
    
    if (!sidebarMenu) return;
    
    if (sidebarTitle) {
        sidebarTitle.textContent = currentTop;
    }
    
    const menuData = MENU_STRUCTURE[currentTop];
    if (!menuData) return;
    
    sidebarMenu.innerHTML = '';
    
    Object.entries(menuData.items).forEach(([l2Label, l2Data]) => {
        const menuItem = document.createElement('li');
        menuItem.className = 'menu-item';
        
        if (l2Label === currentL2) {
            menuItem.classList.add('open', 'active');
        }
        
        // Menu main (L2)
        const menuMain = document.createElement('div');
        menuMain.className = 'menu-main';
        menuMain.innerHTML = `
            <span class="menu-label">
                <span class="menu-icon">${getMenuIcon(l2Label)}</span>
                ${l2Label}
            </span>
            <span class="menu-arrow">▶</span>
        `;
        menuMain.onclick = () => toggleMenu(menuItem, l2Label);
        
        // Submenu (L3)
        const submenu = document.createElement('ul');
        submenu.className = 'submenu';
        
        l2Data.items.forEach(l3Label => {
            const submenuItem = document.createElement('li');
            submenuItem.className = 'submenu-item';
            if (l3Label === currentL3) {
                submenuItem.classList.add('active');
            }
            submenuItem.textContent = l3Label;
            submenuItem.onclick = (e) => {
                e.stopPropagation();
                handleSubmenuClick(l2Label, l3Label, l2Data.links[l3Label]);
            };
            submenu.appendChild(submenuItem);
        });
        
        menuItem.appendChild(menuMain);
        menuItem.appendChild(submenu);
        sidebarMenu.appendChild(menuItem);
    });
}

function toggleMenu(menuItem, l2Label) {
    const wasOpen = menuItem.classList.contains('open');
    
    // Close all other menus
    document.querySelectorAll('.menu-item.open').forEach(item => {
        item.classList.remove('open');
    });
    
    // Toggle current menu
    if (!wasOpen) {
        menuItem.classList.add('open');
        currentL2 = l2Label;
    }
}

function handleSubmenuClick(l2Label, l3Label, link) {
    currentL2 = l2Label;
    currentL3 = l3Label;
    
    if (link && link !== '#') {
        window.location.href = link;
    } else {
        updateBreadcrumb();
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

function getMenuIcon(label) {
    const icons = {
        "상품 관리": "📋",
        "고객사 관리": "🏢",
        "대시보드": "📊",
        "사용자 관리": "👥",
        "구독 관리": "📝",
        "DevOps": "🔧",
        "Support Center": "💬",
        "청구/수납": "💳",
        "시스템": "⚙️",
        "마이페이지": "👤"
    };
    return icons[label] || "📁";
}

// =========================
// Breadcrumb
// =========================
function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;
    
    let html = `<span>${currentTop}</span>`;
    if (currentL2) html += `<span>${currentL2}</span>`;
    if (currentL3) html += `<span>${currentL3}</span>`;
    
    breadcrumb.innerHTML = html;
}

// =========================
// Modal Functions
// =========================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// =========================
// Tab Functions
// =========================
function initTabs(containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const tabs = container.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            if (callback) callback(tab.dataset.tab);
        });
    });
}

// =========================
// Table Functions
// =========================
function selectAllRows(checkbox, tableId) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
        const row = cb.closest('tr');
        if (row) {
            row.classList.toggle('selected', checkbox.checked);
        }
    });
}

function toggleRowSelection(checkbox) {
    const row = checkbox.closest('tr');
    if (row) {
        row.classList.toggle('selected', checkbox.checked);
    }
    
    // Update header checkbox
    const table = row.closest('table');
    if (table) {
        const allCbs = table.querySelectorAll('tbody input[type="checkbox"]');
        const headerCb = table.querySelector('thead input[type="checkbox"]');
        if (headerCb) {
            const checkedCount = table.querySelectorAll('tbody input[type="checkbox"]:checked').length;
            headerCb.checked = checkedCount === allCbs.length;
            headerCb.indeterminate = checkedCount > 0 && checkedCount < allCbs.length;
        }
    }
}

// =========================
// Pagination
// =========================
function renderPagination(containerId, currentPage, totalPages, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let html = '';
    
    // Previous button
    html += `<div class="pagination-item ${currentPage === 1 ? 'disabled' : ''}" 
                 onclick="${currentPage > 1 ? callback + '(' + (currentPage - 1) + ')' : ''}">‹</div>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += `<div class="pagination-item ${i === currentPage ? 'active' : ''}" 
                         onclick="${callback}(${i})">${i}</div>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += `<div class="pagination-item disabled">...</div>`;
        }
    }
    
    // Next button
    html += `<div class="pagination-item ${currentPage === totalPages ? 'disabled' : ''}" 
                 onclick="${currentPage < totalPages ? callback + '(' + (currentPage + 1) + ')' : ''}">›</div>`;
    
    container.innerHTML = html;
}

// =========================
// Toast Notifications
// =========================
function showToast(message, type = 'info') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <span class="toast-close" onclick="this.parentElement.remove()">×</span>
    `;
    
    // Add toast styles if not exists
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 24px;
                right: 24px;
                padding: 14px 20px;
                background: #333;
                color: white;
                border-radius: 10px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }
            .toast-success { background: #166534; }
            .toast-error { background: #991b1b; }
            .toast-warning { background: #854d0e; }
            .toast-close { cursor: pointer; font-size: 20px; opacity: 0.7; }
            .toast-close:hover { opacity: 1; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => toast.remove(), 3000);
}

// =========================
// Utility Functions
// =========================
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\. /g, '-').replace('.', '');
}

function formatDateTime(date) {
    const d = new Date(date);
    return d.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatNumber(num) {
    return num.toLocaleString('ko-KR');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =========================
// Export for use
// =========================
window.AdminApp = {
    init: initApp,
    openModal,
    closeModal,
    initTabs,
    selectAllRows,
    toggleRowSelection,
    renderPagination,
    showToast,
    formatDate,
    formatDateTime,
    formatNumber,
    debounce,
    MENU_STRUCTURE
};
