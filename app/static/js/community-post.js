document.addEventListener('DOMContentLoaded', () => {
    const postText = document.getElementById('postText');
    const postPhoto = document.getElementById('postPhoto');
    const postPhotoPreview = document.getElementById('postPhotoPreview');
    const composerPreview = document.getElementById('composerPreview');
    const photoPickerRow = document.getElementById('photoPickerRow');
    const postButton = document.getElementById('postButton');
    const cancelButton = document.getElementById('cancelButton');
    const i18n = window.i18n;
    const t = (key) => (i18n && typeof i18n.t === 'function' ? i18n.t(key) : key);
    let imageDataUrl = '';

    function updateButtonState() {
        const hasText = postText.value.trim().length > 0;
        const hasImage = Boolean(imageDataUrl);
        postButton.disabled = !(hasText || hasImage);
    }

    function loadStoredPosts() {
        const raw = localStorage.getItem('maizenexPosts');
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function savePost(post) {
        const posts = loadStoredPosts();
        posts.unshift(post);
        localStorage.setItem('maizenexPosts', JSON.stringify(posts));
    }

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

    function saveNotification(notification) {
        const notifications = loadNotifications();
        notifications.unshift(notification);
        localStorage.setItem('maizenexNotifications', JSON.stringify(notifications));
    }

    function clearDraftImage() {
        localStorage.removeItem('maizenexDraftImage');
    }

    function loadDraftImage() {
        const draftImage = localStorage.getItem('maizenexDraftImage');
        if (!draftImage) {
            return;
        }
        imageDataUrl = draftImage;
        postPhotoPreview.src = imageDataUrl;
        composerPreview.classList.remove('hidden');
        if (photoPickerRow) {
            photoPickerRow.classList.add('hidden');
        }
        updateButtonState();
    }

    postPhoto.addEventListener('change', () => {
        const file = postPhoto.files[0];
        if (!file) {
            imageDataUrl = '';
            postPhotoPreview.src = '';
            composerPreview.classList.add('hidden');
            updateButtonState();
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            imageDataUrl = event.target.result;
            postPhotoPreview.src = imageDataUrl;
            composerPreview.classList.remove('hidden');
            updateButtonState();
        };
        reader.readAsDataURL(file);
    });

    postText.addEventListener('input', updateButtonState);

    postButton.addEventListener('click', () => {
        const textValue = postText.value.trim();

        if (!textValue && !imageDataUrl) {
            return;
        }

        const newPost = {
            id: crypto.randomUUID(),
            author: t('community.post.you'),
            initials: 'ME',
            createdAt: Date.now(),
            content: textValue || t('community.post.photo_only'),
            imageUrl: imageDataUrl,
            likes: 0,
            liked: false,
            comments: [],
            showAllComments: false
        };

        const hasText = textValue.length > 0;
        const hasImage = Boolean(imageDataUrl);
        let notificationType = 'post';
        if (hasImage && !hasText) {
            notificationType = 'photo';
        } else if (hasText && !hasImage) {
            notificationType = 'thought';
        }

        saveNotification({
            id: crypto.randomUUID(),
            postId: newPost.id,
            author: newPost.author,
            type: notificationType,
            createdAt: Date.now(),
            read: false
        });

        savePost(newPost);
        clearDraftImage();
        window.location.href = 'community.html';
    });

    cancelButton.addEventListener('click', () => {
        clearDraftImage();
        window.location.href = 'community.html';
    });

    loadDraftImage();
    updateButtonState();
});
