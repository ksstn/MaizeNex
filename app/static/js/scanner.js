document.addEventListener('DOMContentLoaded', () => {
    const scannerUrl = '../pages/partials/scanner.html';

    async function loadScannerMarkup() {
        if (document.getElementById('scannerModal')) {
            initScanner();
            return;
        }

        try {
            const response = await fetch(scannerUrl);
            if (!response.ok) {
                throw new Error('Scanner markup not found');
            }
            const markup = await response.text();
            document.body.insertAdjacentHTML('beforeend', markup);
            initScanner();
        } catch (error) {
            console.error('Failed to load scanner markup:', error);
        }
    }

    function initScanner() {
        const scannerLink = document.querySelector('.scanner');
        const scannerModalEl = document.getElementById('scannerModal');
        if (!scannerLink || !scannerModalEl || !window.bootstrap) {
            return;
        }

        const scannerModal = new bootstrap.Modal(scannerModalEl);
        const resultModal = document.getElementById('resultModal');
        const video = document.getElementById('scannerVideo');
        const canvas = document.getElementById('scannerCanvas');
        const captureButton = document.getElementById('captureButton');
        const uploadButton = document.getElementById('uploadButton');
        const backButton = document.getElementById('backButton');
        const closeResultButton = document.getElementById('closeResultButton');
        const resultSheet = document.querySelector('.result-modal-content');
        const resultDragHandle = document.getElementById('resultDragHandle');
        const imageUpload = document.getElementById('imageUpload');
        const scanResult = document.getElementById('scanResult');
        const capturedImage = document.getElementById('capturedImage');
        const resultText = document.getElementById('resultText');
        let stream = null;
        let isDraggingSheet = false;
        let dragStartY = 0;
        let dragStartHeight = 0;

        scannerLink.addEventListener('click', (event) => {
            event.preventDefault();
            scannerModal.show();
            startCamera();
        });

        backButton.addEventListener('click', () => {
            scannerModal.hide();
        });

        function setSheetHeight(heightPx) {
            resultSheet.style.height = `${heightPx}px`;
        }

        function getSheetBounds() {
            const modalBodyHeight = resultModal.getBoundingClientRect().height;
            const minHeight = modalBodyHeight * 0.5;
            const maxHeight = modalBodyHeight;
            return { minHeight, maxHeight };
        }

        function onDragStart(event) {
            isDraggingSheet = true;
            dragStartY = event.clientY;
            dragStartHeight = resultSheet.getBoundingClientRect().height;
            resultSheet.style.transition = 'none';
        }

        function onDragMove(event) {
            if (!isDraggingSheet) return;
            const { minHeight, maxHeight } = getSheetBounds();
            const delta = dragStartY - event.clientY;
            const nextHeight = Math.min(maxHeight, Math.max(minHeight, dragStartHeight + delta));
            setSheetHeight(nextHeight);
        }

        function onDragEnd() {
            if (!isDraggingSheet) return;
            isDraggingSheet = false;
            const { minHeight, maxHeight } = getSheetBounds();
            const currentHeight = resultSheet.getBoundingClientRect().height;
            const snapPoint = maxHeight * 0.75;
            resultSheet.style.transition = 'height 0.2s ease-out';
            setSheetHeight(currentHeight >= snapPoint ? maxHeight : minHeight);
            setTimeout(() => {
                resultSheet.style.transition = '';
            }, 200);
        }

        if (resultDragHandle) {
            resultDragHandle.addEventListener('pointerdown', onDragStart);
            window.addEventListener('pointermove', onDragMove);
            window.addEventListener('pointerup', onDragEnd);
            window.addEventListener('pointercancel', onDragEnd);
        }

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment',
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    }
                });
                video.srcObject = stream;
                video.play();
            } catch (error) {
                console.error('Error accessing camera:', error);
                alert('Unable to access camera. Please check permissions.');
            }
        }

        captureButton.addEventListener('click', () => {
            analyzeLeaf();
        });

        uploadButton.addEventListener('click', () => {
            imageUpload.click();
        });

        imageUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                analyzeUploadedImage(file);
            }
        });

        function analyzeLeaf() {
            const canvasContext = canvas.getContext('2d');
            const frameSize = 250;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;
            const centerX = videoWidth / 2;
            const centerY = videoHeight * 0.3;
            const halfFrame = frameSize / 2;
            const sourceX = Math.max(0, centerX - halfFrame);
            const sourceY = Math.max(0, centerY - halfFrame);
            const sourceWidth = Math.min(frameSize, videoWidth - sourceX);
            const sourceHeight = Math.min(frameSize, videoHeight - sourceY);

            canvas.width = frameSize;
            canvas.height = frameSize;

            canvasContext.fillStyle = 'black';
            canvasContext.fillRect(0, 0, frameSize, frameSize);

            const destX = (frameSize - sourceWidth) / 2;
            const destY = (frameSize - sourceHeight) / 2;

            canvasContext.drawImage(
                video,
                sourceX, sourceY, sourceWidth, sourceHeight,
                destX, destY, sourceWidth, sourceHeight
            );

            performAnalysis();
        }

        function analyzeUploadedImage(file) {
            const canvasContext = canvas.getContext('2d');
            const img = new Image();

            img.onload = function() {
                const frameSize = 250;
                const aspectRatio = img.width / img.height;

                let drawWidth;
                let drawHeight;
                let offsetX;
                let offsetY;

                if (aspectRatio > 1) {
                    drawWidth = frameSize;
                    drawHeight = frameSize / aspectRatio;
                    offsetX = 0;
                    offsetY = (frameSize - drawHeight) / 2;
                } else {
                    drawWidth = frameSize * aspectRatio;
                    drawHeight = frameSize;
                    offsetX = (frameSize - drawWidth) / 2;
                    offsetY = 0;
                }

                canvas.width = frameSize;
                canvas.height = frameSize;

                canvasContext.fillStyle = 'black';
                canvasContext.fillRect(0, 0, frameSize, frameSize);

                canvasContext.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

                performAnalysis();
            };

            img.src = URL.createObjectURL(file);
        }

        function performAnalysis() {
            scanResult.textContent = 'Analyzing leaf nutrients...';

            setTimeout(() => {
                const analysisData = [
                    {
                        diagnosis: 'Nitrogen deficiency detected',
                        severity: 'Moderate - Leaf shows yellowing at edges',
                        recommendation: 'Apply nitrogen-rich fertilizer immediately',
                        solution: 'Use urea (46-0-0) at 50kg/ha or ammonium nitrate. Water thoroughly after application. Monitor improvement in 7-10 days.'
                    },
                    {
                        diagnosis: 'Healthy leaf - optimal nutrients',
                        severity: 'None - Plant is in excellent condition',
                        recommendation: 'Continue current fertilization program',
                        solution: 'Maintain balanced NPK fertilization. Regular soil testing recommended every 3 months.'
                    },
                    {
                        diagnosis: 'Phosphorus deficiency detected',
                        severity: 'Mild to Moderate - Stunted growth observed',
                        recommendation: 'Apply phosphorus fertilizer',
                        solution: 'Apply triple superphosphate (0-46-0) at 40kg/ha. Incorporate into soil around root zone. Best applied during planting.'
                    },
                    {
                        diagnosis: 'Potassium deficiency detected',
                        severity: 'Moderate - Leaf margins browning',
                        recommendation: 'Apply potassium-rich fertilizer',
                        solution: 'Use potassium chloride (0-0-60) at 30kg/ha. Apply as side dressing. Avoid chloride-sensitive soils.'
                    },
                    {
                        diagnosis: 'Magnesium deficiency detected',
                        severity: 'Mild - Interveinal chlorosis visible',
                        recommendation: 'Apply magnesium supplement',
                        solution: 'Apply Epsom salt (magnesium sulfate) foliar spray at 2% solution. For soil application, use dolomite lime at 100kg/ha.'
                    }
                ];

                const randomAnalysis = analysisData[Math.floor(Math.random() * analysisData.length)];

                capturedImage.src = canvas.toDataURL('image/png');
                resultText.textContent = randomAnalysis.diagnosis;
                document.getElementById('severityText').textContent = randomAnalysis.severity;
                document.getElementById('recommendationText').textContent = randomAnalysis.recommendation;
                document.getElementById('solutionText').textContent = randomAnalysis.solution;

                document.querySelector('.scanner-overlay').style.display = 'none';
                document.querySelector('.control-panel').style.display = 'none';

                resultModal.style.display = 'flex';
                const { minHeight } = getSheetBounds();
                setSheetHeight(minHeight);

                if (stream) {
                    stream.getTracks().forEach((track) => track.stop());
                    stream = null;
                }
            }, 2000);
        }

        closeResultButton.addEventListener('click', () => {
            resultModal.style.display = 'none';
            onDragEnd();
            document.querySelector('.scanner-overlay').style.display = 'flex';
            document.querySelector('.control-panel').style.display = 'block';
            resultText.textContent = '';
            document.getElementById('severityText').textContent = '';
            document.getElementById('recommendationText').textContent = '';
            document.getElementById('solutionText').textContent = '';
            capturedImage.src = '';
            startCamera();
            scanResult.textContent = '';
        });

        scannerModalEl.addEventListener('hidden.bs.modal', () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
                stream = null;
            }
            scanResult.textContent = '';
            resultText.textContent = '';
            document.getElementById('severityText').textContent = '';
            document.getElementById('recommendationText').textContent = '';
            document.getElementById('solutionText').textContent = '';
            capturedImage.src = '';
            imageUpload.value = '';
        });
    }

    loadScannerMarkup();
});
