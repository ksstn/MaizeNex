document.addEventListener('DOMContentLoaded', () => {
    const composerInput = document.getElementById('composerInput');
    const composerMediaButton = document.getElementById('composerMediaButton');
    const composerMediaInput = document.getElementById('composerMediaInput');
    const notificationBadge = document.getElementById('notificationBadge');
    const feedList = document.getElementById('feedList');
    const imageModal = document.getElementById('imageModal');
    const imageModalTarget = document.getElementById('imageModalTarget');
    const closeImageModal = document.getElementById('closeImageModal');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomReset = document.getElementById('zoomReset');
    const i18n = window.i18n;
    const t = (key) => (i18n && typeof i18n.t === 'function' ? i18n.t(key) : key);
    const format = (key, params) => (i18n && typeof i18n.format === 'function' ? i18n.format(key, params) : t(key));
    let imageZoom = 1;
    let notifications = [];

    function clearDraftImage() {
        localStorage.removeItem('maizenexDraftImage');
    }

    if (composerInput) {
        composerInput.addEventListener('click', () => {
            clearDraftImage();
            window.location.href = 'community-post.html';
        });
    }

    if (composerMediaButton && composerMediaInput) {
        composerMediaButton.addEventListener('click', () => {
            composerMediaInput.click();
        });

        composerMediaInput.addEventListener('change', () => {
            const file = composerMediaInput.files[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                localStorage.setItem('maizenexDraftImage', event.target.result);
                window.location.href = 'community-post.html';
            };
            reader.readAsDataURL(file);
        });
    }

    const seedPosts = [
        {
            id: crypto.randomUUID(),
            author: 'Liza Mendoza',
            initials: 'LM',
            createdAt: Date.now() - 2 * 60 * 60 * 1000,
            contentKey: 'community.seed.post_1',
            imageUrl: '../static/img/sample-post.jpg',
            likes: 23,
            liked: false,
            commentKeys: ['community.seed.comment_1', 'community.seed.comment_2'],
            comments: [],
            showAllComments: false
        },
        {
            id: crypto.randomUUID(),
            author: 'Alvin Reyes',
            initials: 'AR',
            createdAt: Date.now() - 24 * 60 * 60 * 1000,
            contentKey: 'community.seed.post_2',
            imageUrl: '',
            likes: 8,
            liked: false,
            commentKeys: ['community.seed.comment_3'],
            comments: [],
            showAllComments: false
        }
    ];

    function loadStoredPosts() {
        const raw = localStorage.getItem('maizenexPosts');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) return [];
            return parsed.map((post) => ({
                ...post,
                createdAt: typeof post.createdAt === 'number' ? post.createdAt : Number(post.createdAt)
            }));
        } catch (error) {
            return [];
        }
    }

    function saveStoredPosts(list) {
        localStorage.setItem('maizenexPosts', JSON.stringify(list));
    }

    const posts = [...loadStoredPosts(), ...seedPosts];

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

    function saveNotifications(list) {
        localStorage.setItem('maizenexNotifications', JSON.stringify(list));
    }

    function updateNotificationBadge() {
        if (!notificationBadge) return;
        const unreadCount = notifications.filter((item) => !item.read).length;
        if (unreadCount === 0) {
            notificationBadge.classList.add('hidden');
            notificationBadge.textContent = '0';
            return;
        }
        notificationBadge.classList.remove('hidden');
        notificationBadge.textContent = unreadCount > 99 ? '99+' : String(unreadCount);
    }

    function isUserPost(post) {
        const author = post.author || '';
        return author === t('community.post.you') || author === 'You' || author === 'Ikaw';
    }

    function createNotification({ postId, type }) {
        const actor = t('notification.someone');
        notifications.unshift({
            id: crypto.randomUUID(),
            postId,
            author: actor,
            type,
            createdAt: Date.now(),
            read: false
        });
        saveNotifications(notifications);
        updateNotificationBadge();
    }

    function closeImageViewer() {
        if (!imageModal) return;
        imageModal.classList.add('hidden');
        imageModalTarget.src = '';
        imageZoom = 1;
        imageModalTarget.style.transform = 'scale(1)';
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

    function getPostContent(post) {
        if (post.contentKey) {
            return t(post.contentKey);
        }
        return post.content || '';
    }

    function renderPosts() {
        feedList.innerHTML = '';
        posts.forEach((post) => {
            const card = document.createElement('div');
            card.className = 'feed-card mb-4';
            card.dataset.postId = post.id;
            card.id = `post-${post.id}`;

            const imageMarkup = post.imageUrl
                ? `<img class="feed-image zoomable" src="${post.imageUrl}" alt="${t('community.post.image_alt')}">`
                : '';

            const seedComments = post.commentKeys ? post.commentKeys.map((key) => t(key)) : [];
            const userComments = post.comments || [];
            const allComments = [...seedComments, ...userComments];
            const visibleComments = post.showAllComments ? allComments : allComments.slice(0, 2);
            const commentsMarkup = visibleComments
                .map((comment) => `<div class="comment-item">${comment}</div>`)
                .join('');
            const hiddenCount = Math.max(0, allComments.length - visibleComments.length);
            const toggleLabel = post.showAllComments
                ? t('community.comments.less')
                : format('community.comments.more', { count: hiddenCount });
            const toggleButton = hiddenCount > 0 || post.showAllComments
                ? `<button class="btn btn-link btn-sm toggle-comments">${toggleLabel}</button>`
                : '';

            card.innerHTML = `
                <div class="post-header mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <div class="avatar">${post.initials}</div>
                        <div>
                            <div class="fw-semibold">${post.author}</div>
                            <small class="text-muted">${formatRelativeTime(post.createdAt)}</small>
                        </div>
                    </div>
                    <div class="post-menu">
                        <button class="post-menu-button" aria-label="${t('community.post.menu')}">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <div class="post-menu-list hidden">
                            <button class="post-menu-edit">${t('community.post.edit')}</button>
                            <button class="post-menu-delete">${t('community.post.delete')}</button>
                        </div>
                    </div>
                </div>
                <p class="mb-3">${getPostContent(post)}</p>
                ${imageMarkup}
                <div class="post-meta d-flex justify-content-between mt-3">
                    <span><i class="fa-regular fa-thumbs-up"></i>${post.likes} ${t('community.post.likes')}</span>
                    <span>${allComments.length} ${t('community.post.comments')}</span>
                </div>
                <div class="post-interactions mt-3 d-flex justify-content-between">
                    <button class="btn btn-light btn-sm like-button ${post.liked ? 'active' : ''}">
                        <i class="fa-regular fa-thumbs-up me-1"></i>${t('community.post.like')}
                    </button>
                    <button class="btn btn-light btn-sm comment-button">
                        <i class="fa-regular fa-comment me-1"></i>${t('community.post.comment')}
                    </button>
                </div>
                <div class="comment-box mt-3">
                    <input type="text" class="comment-input" placeholder="${t('community.comment.placeholder')}">
                </div>
                <div class="comment-list">${commentsMarkup}</div>
                ${toggleButton}
            `;

            feedList.appendChild(card);
        });
    }

    function scrollToPost(postId) {
        const target = document.getElementById(`post-${postId}`);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    feedList.addEventListener('click', (event) => {
        const postCard = event.target.closest('.feed-card');
        if (!postCard) return;
        const postId = postCard.dataset.postId;
        const post = posts.find((item) => item.id === postId);
        if (!post) return;

        if (event.target.closest('.like-button')) {
            post.liked = !post.liked;
            post.likes = post.liked ? post.likes + 1 : Math.max(0, post.likes - 1);
            if (post.liked && isUserPost(post)) {
                createNotification({ postId, type: 'like' });
            }
            saveStoredPosts(posts.filter((item) => !item.contentKey));
            renderPosts();
        }

        if (event.target.closest('.comment-button')) {
            const input = postCard.querySelector('.comment-input');
            if (input) {
                input.focus();
            }
        }

        if (event.target.closest('.toggle-comments')) {
            post.showAllComments = !post.showAllComments;
            renderPosts();
        }

        if (event.target.closest('.post-menu-button')) {
            const menu = postCard.querySelector('.post-menu-list');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        }

        if (event.target.closest('.post-menu-delete')) {
            const index = posts.findIndex((item) => item.id === postId);
            if (index !== -1) {
                posts.splice(index, 1);
                saveStoredPosts(posts.filter((item) => !item.contentKey));
                renderPosts();
            }
        }

        if (event.target.closest('.post-menu-edit')) {
            const updated = prompt(t('community.post.edit_prompt'), getPostContent(post));
            if (updated !== null) {
                post.content = updated.trim() || post.content;
                post.contentKey = null;
                saveStoredPosts(posts.filter((item) => !item.contentKey));
                renderPosts();
            }
        }

        if (event.target.closest('.zoomable')) {
            const image = event.target.closest('.zoomable');
            if (!imageModal) return;
            imageModalTarget.src = image.src;
            imageModal.classList.remove('hidden');
            imageZoom = 1;
            imageModalTarget.style.transform = 'scale(1)';
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.post-menu')) {
            document.querySelectorAll('.post-menu-list').forEach((menu) => {
                menu.classList.add('hidden');
            });
        }
    });

    if (closeImageModal) {
        closeImageModal.addEventListener('click', closeImageViewer);
    }

    notifications = loadNotifications();
    renderPosts();
    updateNotificationBadge();

    if (window.location.hash) {
        const postId = window.location.hash.replace('#post-', '');
        setTimeout(() => scrollToPost(postId), 200);
    }

    if (imageModal) {
        imageModal.addEventListener('click', (event) => {
            if (event.target.classList.contains('image-modal-backdrop')) {
                closeImageViewer();
            }
        });
    }

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            imageZoom = Math.min(3, imageZoom + 0.2);
            imageModalTarget.style.transform = `scale(${imageZoom})`;
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            imageZoom = Math.max(0.6, imageZoom - 0.2);
            imageModalTarget.style.transform = `scale(${imageZoom})`;
        });
    }

    if (zoomReset) {
        zoomReset.addEventListener('click', () => {
            imageZoom = 1;
            imageModalTarget.style.transform = 'scale(1)';
        });
    }

    feedList.addEventListener('keydown', (event) => {
        if (!event.target.classList.contains('comment-input')) {
            return;
        }

        if (event.key === 'Enter') {
            const postCard = event.target.closest('.feed-card');
            const postId = postCard.dataset.postId;
            const post = posts.find((item) => item.id === postId);
            const commentValue = event.target.value.trim();

            if (post && commentValue) {
                if (!post.comments) {
                    post.comments = [];
                }
                post.comments.push(commentValue);
                event.target.value = '';
                if (isUserPost(post)) {
                    createNotification({ postId, type: 'comment' });
                }
                saveStoredPosts(posts.filter((item) => !item.contentKey));
                renderPosts();
            }
        }
    });

    if (i18n) {
        document.addEventListener('languagechange', renderPosts);
    }

    renderPosts();
});
