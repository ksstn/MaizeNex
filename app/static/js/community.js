document.addEventListener('DOMContentLoaded', () => {
    const postText = document.getElementById('postText');
    const postPhoto = document.getElementById('postPhoto');
    const postPhotoPreview = document.getElementById('postPhotoPreview');
    const composerPreview = document.getElementById('composerPreview');
    const postButton = document.getElementById('postButton');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadBar = document.getElementById('uploadBar');
    const feedList = document.getElementById('feedList');
    const imageModal = document.getElementById('imageModal');
    const imageModalTarget = document.getElementById('imageModalTarget');
    const closeImageModal = document.getElementById('closeImageModal');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomReset = document.getElementById('zoomReset');
    let imageZoom = 1;

    const seedPosts = [
        {
            id: crypto.randomUUID(),
            author: 'Liza Mendoza',
            initials: 'LM',
            time: '2 hours ago',
            content: 'Sharing my corn growth update after applying nitrogen-rich fertilizer.',
            imageUrl: '../static/img/sample-post.jpg',
            likes: 23,
            liked: false,
            comments: ['Great progress!', 'Looks healthy.'],
            showAllComments: false
        },
        {
            id: crypto.randomUUID(),
            author: 'Alvin Reyes',
            initials: 'AR',
            time: 'Yesterday',
            content: 'Any tips for spotting early signs of phosphorus deficiency?',
            imageUrl: '',
            likes: 8,
            liked: false,
            comments: ['Check for stunted growth.'],
            showAllComments: false
        }
    ];

    const posts = [...seedPosts];

    function updatePostButtonState() {
        const hasText = postText.value.trim().length > 0;
        const hasFile = postPhoto.files.length > 0;
        if (hasText || hasFile) {
            postButton.classList.remove('hidden');
        } else {
            postButton.classList.add('hidden');
        }
    }

    function closeImageViewer() {
        imageModal.classList.add('hidden');
        imageModalTarget.src = '';
        imageZoom = 1;
        imageModalTarget.style.transform = 'scale(1)';
    }

    function renderPosts() {
        feedList.innerHTML = '';
        posts.forEach((post) => {
            const card = document.createElement('div');
            card.className = 'feed-card mb-4';
            card.dataset.postId = post.id;

            const imageMarkup = post.imageUrl
                ? `<img class="feed-image zoomable" src="${post.imageUrl}" alt="Post image">`
                : '';

            const visibleComments = post.showAllComments ? post.comments : post.comments.slice(0, 2);
            const commentsMarkup = visibleComments
                .map((comment) => `<div class="comment-item">${comment}</div>`)
                .join('');
            const hiddenCount = Math.max(0, post.comments.length - visibleComments.length);
            const toggleLabel = post.showAllComments
                ? 'See less'
                : `See more (${hiddenCount})`;
            const toggleButton = hiddenCount > 0 || post.showAllComments
                ? `<button class="btn btn-link btn-sm toggle-comments">${toggleLabel}</button>`
                : '';

            card.innerHTML = `
                <div class="post-header mb-3">
                    <div class="d-flex align-items-center gap-2">
                        <div class="avatar">${post.initials}</div>
                        <div>
                            <div class="fw-semibold">${post.author}</div>
                            <small class="text-muted">${post.time}</small>
                        </div>
                    </div>
                    <div class="post-menu">
                        <button class="post-menu-button" aria-label="Post menu">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <div class="post-menu-list hidden">
                            <button class="post-menu-edit">Edit</button>
                            <button class="post-menu-delete">Delete</button>
                        </div>
                    </div>
                </div>
                <p class="mb-3">${post.content}</p>
                ${imageMarkup}
                <div class="post-meta d-flex justify-content-between mt-3">
                    <span><i class="fa-regular fa-thumbs-up"></i>${post.likes} Likes</span>
                    <span>${post.comments.length} Comments</span>
                </div>
                <div class="post-interactions mt-3 d-flex justify-content-between">
                    <button class="btn btn-light btn-sm like-button ${post.liked ? 'active' : ''}">
                        <i class="fa-regular fa-thumbs-up me-1"></i>Like
                    </button>
                    <button class="btn btn-light btn-sm comment-button">
                        <i class="fa-regular fa-comment me-1"></i>Comment
                    </button>
                </div>
                <div class="comment-box mt-3">
                    <input type="text" class="comment-input" placeholder="Write a comment...">
                </div>
                <div class="comment-list">${commentsMarkup}</div>
                ${toggleButton}
            `;

            feedList.appendChild(card);
        });
    }

    function resetComposer() {
        postText.value = '';
        postPhoto.value = '';
        postPhotoPreview.src = '';
        composerPreview.classList.add('hidden');
        updatePostButtonState();
    }

    function simulateUpload(callback) {
        uploadProgress.classList.remove('hidden');
        uploadBar.style.width = '0%';
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 18;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    uploadProgress.classList.add('hidden');
                    uploadBar.style.width = '0%';
                    callback();
                }, 200);
            }
            uploadBar.style.width = `${progress}%`;
        }, 140);
    }

    postPhoto.addEventListener('change', () => {
        const file = postPhoto.files[0];
        if (!file) {
            postPhotoPreview.src = '';
            composerPreview.classList.add('hidden');
            updatePostButtonState();
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        postPhotoPreview.src = previewUrl;
        composerPreview.classList.remove('hidden');
        updatePostButtonState();
    });

    postText.addEventListener('input', updatePostButtonState);

    postButton.addEventListener('click', () => {
        const textValue = postText.value.trim();
        const file = postPhoto.files[0];

        if (!textValue && !file) {
            return;
        }

        postButton.disabled = true;

        simulateUpload(() => {
            const newPost = {
                id: crypto.randomUUID(),
                author: 'You',
                initials: 'ME',
                time: 'Just now',
                content: textValue || 'Shared a photo update.',
                imageUrl: file ? URL.createObjectURL(file) : '',
                likes: 0,
                liked: false,
                comments: [],
                showAllComments: false
            };

            posts.unshift(newPost);
            renderPosts();
            resetComposer();
            postButton.disabled = false;
        });
    });

    feedList.addEventListener('click', (event) => {
        const postCard = event.target.closest('.feed-card');
        if (!postCard) return;
        const postId = postCard.dataset.postId;
        const post = posts.find((item) => item.id === postId);
        if (!post) return;

        if (event.target.closest('.like-button')) {
            post.liked = !post.liked;
            post.likes = post.liked ? post.likes + 1 : Math.max(0, post.likes - 1);
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
                renderPosts();
            }
        }

        if (event.target.closest('.post-menu-edit')) {
            const updated = prompt('Edit your post:', post.content);
            if (updated !== null) {
                post.content = updated.trim() || post.content;
                renderPosts();
            }
        }

        if (event.target.closest('.zoomable')) {
            const image = event.target.closest('.zoomable');
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
                post.comments.push(commentValue);
                renderPosts();
            }
        }
    });

    renderPosts();
    updatePostButtonState();
});
