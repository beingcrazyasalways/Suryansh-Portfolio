document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.piece');
    const canvas = document.querySelector('.profile-canvas');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    
    let placedPieces = new Set();
    let draggedPiece = null;
    let correctOrder = ['photo', 'headline', 'summary', 'experience', 'education'];
    let currentOrder = [];
    
    // Initialize drag and drop
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);
    });
    
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    
    function handleDragStart(e) {
        draggedPiece = this;
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', this.dataset.piece);
    }
    
    function handleDragEnd() {
        this.classList.remove('dragging');
        draggedPiece = null;
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }
    
    function handleDrop(e) {
        e.preventDefault();
        const pieceType = e.dataTransfer.getData('text/plain');
        
        if (!placedPieces.has(pieceType)) {
            placedPieces.add(pieceType);
            currentOrder.push(pieceType);
            updateProgress();
            placePiece(pieceType);
            checkOrder();
        }
    }
    
    function updateProgress() {
        const totalPieces = pieces.length;
        const progress = (placedPieces.size / totalPieces) * 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            progressFill.classList.add('complete');
            setTimeout(() => {
                showCompletionMessage();
            }, 1000);
        }
    }
    
    function placePiece(pieceType) {
        const piece = document.querySelector(`[data-piece="${pieceType}"]`);
        piece.classList.add('placed');
        
        // Create a visual representation of the placed piece
        const placedElement = document.createElement('div');
        placedElement.className = 'placed-piece';
        placedElement.innerHTML = `
            <i class="${piece.querySelector('i').className}"></i>
            <span>${piece.querySelector('span').textContent}</span>
        `;
        
        // Position the piece in the canvas
        const randomX = Math.random() * (canvas.offsetWidth - 100);
        const randomY = Math.random() * (canvas.offsetHeight - 100);
        placedElement.style.left = `${randomX}px`;
        placedElement.style.top = `${randomY}px`;
        
        canvas.querySelector('.profile-frame').appendChild(placedElement);
        
        // Hide placeholder when first piece is placed
        if (placedPieces.size === 1) {
            profilePlaceholder.style.display = 'none';
        }
    }
    
    function checkOrder() {
        const pieceType = currentOrder[currentOrder.length - 1];
        const expectedPiece = correctOrder[placedPieces.size - 1];
        
        const piece = document.querySelector(`[data-piece="${pieceType}"]`);
        
        if (pieceType === expectedPiece) {
            // Correct order
            piece.classList.add('correct-order');
            showNotification('Great! You placed the correct piece!', 'success');
            
            // Add floating animation to the piece
            piece.style.animation = 'float 2s infinite';
        } else {
            // Wrong order
            piece.classList.add('wrong-order');
            showNotification('Oops! Try placing the pieces in a different order!', 'warning');
            
            // Remove the piece after animation
            setTimeout(() => {
                placedPieces.delete(pieceType);
                currentOrder.pop();
                piece.classList.remove('placed', 'wrong-order');
                updateProgress();
                
                // Remove the placed element from canvas
                const placedElement = canvas.querySelector(`.placed-piece:last-child`);
                if (placedElement) {
                    placedElement.remove();
                }
                
                // Show placeholder if no pieces are placed
                if (placedPieces.size === 0) {
                    profilePlaceholder.style.display = 'block';
                }
            }, 1000);
        }
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    function showCompletionMessage() {
        const completionMessage = document.createElement('div');
        completionMessage.className = 'completion-message';
        completionMessage.innerHTML = `
            <h2>Profile Complete!</h2>
            <p>Thank you for helping build my LinkedIn profile!</p>
            <p>It will be ready soon. Please check back later.</p>
            <div class="celebration">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
        `;
        
        canvas.querySelector('.profile-frame').appendChild(completionMessage);
        showNotification('Congratulations! You completed the profile!', 'success');
    }
    
    // Add some fun animations
    pieces.forEach(piece => {
        piece.addEventListener('mouseenter', () => {
            if (!piece.classList.contains('placed')) {
                piece.style.transform = 'translateY(-5px)';
            }
        });
        
        piece.addEventListener('mouseleave', () => {
            if (!piece.classList.contains('placed')) {
                piece.style.transform = 'translateY(0)';
            }
        });
    });
}); 