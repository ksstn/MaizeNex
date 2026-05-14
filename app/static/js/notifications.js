document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.getElementById('notificationList');
    const i18n = window.i18n;
    const t = (key) => (i18n && typeof i18n.t === 'function' ? i18n.t(key) : key);
    const format = (key, params) => (i18n && typeof i18n.format === 'function' ? i18n.format(key, params) : t(key));

    function loadNotifications() {
        const raw = localStorage.getItem('maizenexNotifications');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function loadPosts() {
        const raw = localStorage.getItem('maizenexPosts');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function saveNotifications(list) {
        localStorage.setItem('maizenexNotifications', JSON.stringify(list));
    }

    function formatRelativeTime(timestamp) {
        if (!timestamp) return t('time.just_now');
        const diffMs = Date.now() - timestamp;
        const minutes = Math.max(0, Math.floor(diffMs / 60000));
        if (minutes < 1) return t('time.just_now');
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return format('time.hours_ago', { count: hours });
        const days = Math.floor(hours / 24);
        if (days === 1) return t('time.yesterday');
        return format('time.days_ago', { count: days });
    }

    function getNotificationMessage(notification) {
        const author = notification.author || t('community.post.you');
        if (notification.type === 'photo') {
            return format('notification.photo', { author });
        }
        if (notification.type === 'thought') {
            return format('notification.thought', { author });
        }
        if (notification.type === 'like') {
            return format('notification.like', { author });
        }
        if (notification.type === 'comment') {
            return format('notification.comment', { author });
        }
        return format('notification.post', { author });
    }

    function renderNotifications(list) {
        if (!notificationList) return;
        notificationList.innerHTML = '';

        if (list.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'notification-item read';
            empty.textContent = t('notification.empty');
            notificationList.appendChild(empty);
            return;
        }

        list.forEach((notification) => {
            const item = document.createElement('div');
            item.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
            item.dataset.postId = notification.postId;
            item.dataset.notificationId = notification.id;
            item.innerHTML = `
                <div>${getNotificationMessage(notification)}</div>
                <div class="notification-time">${formatRelativeTime(notification.createdAt)}</div>
            `;
            notificationList.appendChild(item);
        });
    }

    let notifications = loadNotifications();
    renderNotifications(notifications);

    if (notificationList) {
        notificationList.addEventListener('click', (event) => {
            const notificationItem = event.target.closest('.notification-item');
            if (!notificationItem || !notificationItem.dataset.postId) return;
            const postId = notificationItem.dataset.postId;
            const notificationId = notificationItem.dataset.notificationId;
            const targetNotification = notifications.find((item) => item.id === notificationId);
            if (targetNotification && !targetNotification.read) {
                targetNotification.read = true;
                saveNotifications(notifications);
            }
            const posts = loadPosts();
            const hasPost = posts.some((post) => post.id === postId);
            if (!hasPost) {
                renderNotifications(notifications);
                const currentItem = notificationList.querySelector(`[data-notification-id="${notificationId}"]`);
                if (currentItem) {
                    currentItem.classList.remove('unread');
                    currentItem.classList.add('read');
                    currentItem.innerHTML = `
                        <div>${t('notification.unavailable')}</div>
                        <div class="notification-time">${formatRelativeTime(Date.now())}</div>
                    `;
                }
                return;
            }
            window.location.href = `community.html#post-${postId}`;
        });
    }
});
