// Base64 Encoder/Decoder Application
class Base64Tool {
    constructor() {
        this.currentMode = 'encode';
        this.debounceTimer = null;
        this.initializeElements();
        this.attachEventListeners();
        this.updateInterface();
    }

    initializeElements() {
        // Mode buttons
        this.encodeBtn = document.getElementById('encodeBtn');
        this.decodeBtn = document.getElementById('decodeBtn');
        
        // Text areas
        this.inputText = document.getElementById('inputText');
        this.outputText = document.getElementById('outputText');
        
        // Labels
        this.inputLabel = document.getElementById('inputLabel');
        this.outputLabel = document.getElementById('outputLabel');
        
        // Action buttons
        this.copyBtn = document.getElementById('copyBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.pasteBtn = document.getElementById('pasteBtn');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.clearInputBtn = document.getElementById('clearInputBtn');
        this.clearOutputBtn = document.getElementById('clearOutputBtn');
        
        // File input
        this.fileInput = document.getElementById('fileInput');
        
        // Status elements
        this.errorMessage = document.getElementById('errorMessage');
        this.errorText = document.getElementById('errorText');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusIcon = document.getElementById('statusIcon');
        this.statusText = document.getElementById('statusText');
        
        // Character counters
        this.inputCharCount = document.getElementById('inputCharCount');
        this.outputCharCount = document.getElementById('outputCharCount');
        
        // Copy button text
        this.copyBtnText = document.getElementById('copyBtnText');
    }

    attachEventListeners() {
        // Mode switching
        this.encodeBtn.addEventListener('click', () => this.switchMode('encode'));
        this.decodeBtn.addEventListener('click', () => this.switchMode('decode'));
        
        // Real-time processing
        this.inputText.addEventListener('input', () => this.handleInputChange());
        this.inputText.addEventListener('paste', () => setTimeout(() => this.handleInputChange(), 10));
        
        // Action buttons
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.downloadBtn.addEventListener('click', () => this.downloadResult());
        this.pasteBtn.addEventListener('click', () => this.pasteFromClipboard());
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.clearInputBtn.addEventListener('click', () => this.clearInput());
        this.clearOutputBtn.addEventListener('click', () => this.clearOutput());
        
        // File upload
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Character counting
        this.inputText.addEventListener('input', () => this.updateCharacterCounts());
        this.outputText.addEventListener('input', () => this.updateCharacterCounts());
    }

    switchMode(mode) {
        this.currentMode = mode;
        this.updateInterface();
        this.clearError();
        
        // Swap content if there's text in output
        if (this.outputText.value && this.inputText.value) {
            const temp = this.inputText.value;
            this.inputText.value = this.outputText.value;
            this.outputText.value = temp;
        }
        
        this.handleInputChange();
    }

    updateInterface() {
        if (this.currentMode === 'encode') {
            // Update buttons
            this.encodeBtn.classList.add('bg-primary', 'text-white', 'shadow-sm');
            this.encodeBtn.classList.remove('text-slate-600', 'hover:text-slate-800');
            this.decodeBtn.classList.remove('bg-primary', 'text-white', 'shadow-sm');
            this.decodeBtn.classList.add('text-slate-600', 'hover:text-slate-800');
            
            // Update labels
            this.inputLabel.textContent = 'Plain Text Input';
            this.outputLabel.textContent = 'Base64 Output';
            
            // Update placeholders
            this.inputText.placeholder = 'Enter your text here...';
            this.outputText.placeholder = 'Base64 result will appear here...';
        } else {
            // Update buttons
            this.decodeBtn.classList.add('bg-primary', 'text-white', 'shadow-sm');
            this.decodeBtn.classList.remove('text-slate-600', 'hover:text-slate-800');
            this.encodeBtn.classList.remove('bg-primary', 'text-white', 'shadow-sm');
            this.encodeBtn.classList.add('text-slate-600', 'hover:text-slate-800');
            
            // Update labels
            this.inputLabel.textContent = 'Base64 Input';
            this.outputLabel.textContent = 'Plain Text Output';
            
            // Update placeholders
            this.inputText.placeholder = 'Enter Base64 encoded text here...';
            this.outputText.placeholder = 'Decoded text will appear here...';
        }
        
        this.updateCharacterCounts();
    }

    handleInputChange() {
        // Clear previous timer
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        // Debounce processing to avoid excessive calls
        this.debounceTimer = setTimeout(() => {
            this.processText();
        }, 100);
    }

    processText() {
        const input = this.inputText.value.trim();
        
        if (!input) {
            this.outputText.value = '';
            this.clearError();
            this.hideStatus();
            this.updateButtonStates();
            this.updateCharacterCounts();
            return;
        }
        
        try {
            let result;
            
            if (this.currentMode === 'encode') {
                result = this.encodeBase64(input);
                this.showStatus('success', 'Encoded successfully');
            } else {
                result = this.decodeBase64(input);
                this.showStatus('success', 'Decoded successfully');
            }
            
            this.outputText.value = result;
            this.clearError();
            this.removeInputErrorState();
            
        } catch (error) {
            this.showError(error.message);
            this.addInputErrorState();
            this.outputText.value = '';
            this.hideStatus();
        }
        
        this.updateButtonStates();
        this.updateCharacterCounts();
    }

    encodeBase64(text) {
        try {
            return btoa(unescape(encodeURIComponent(text)));
        } catch (error) {
            throw new Error('Failed to encode text. Please check your input.');
        }
    }

    decodeBase64(base64) {
        try {
            // Check if valid base64
            if (!this.isValidBase64(base64)) {
                throw new Error('Invalid Base64 format. Please check your input.');
            }
            
            return decodeURIComponent(escape(atob(base64)));
        } catch (error) {
            if (error.message.includes('Invalid Base64')) {
                throw error;
            }
            throw new Error('Invalid Base64 format. Please check your input.');
        }
    }

    isValidBase64(str) {
        // Remove whitespace
        str = str.replace(/\s/g, '');
        
        // Check if empty
        if (!str) return false;
        
        // Check base64 pattern
        const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
        if (!base64Pattern.test(str)) return false;
        
        // Check length (must be multiple of 4)
        if (str.length % 4 !== 0) return false;
        
        // Try to decode
        try {
            atob(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    async copyToClipboard() {
        if (!this.outputText.value) return;
        
        try {
            await navigator.clipboard.writeText(this.outputText.value);
            this.showCopySuccess();
        } catch (error) {
            // Fallback for older browsers
            this.fallbackCopy();
        }
    }

    fallbackCopy() {
        this.outputText.select();
        this.outputText.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (error) {
            this.showError('Failed to copy to clipboard. Please copy manually.');
        }
    }

    showCopySuccess() {
        const originalText = this.copyBtnText.textContent;
        const originalClasses = this.copyBtn.className;
        
        this.copyBtn.classList.add('copy-success');
        this.copyBtnText.textContent = 'Copied!';
        
        setTimeout(() => {
            this.copyBtn.className = originalClasses;
            this.copyBtnText.textContent = originalText;
        }, 2000);
    }

    async pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            this.inputText.value = text;
            this.handleInputChange();
            this.inputText.focus();
        } catch (error) {
            this.showError('Failed to paste from clipboard. Please paste manually.');
        }
    }

    downloadResult() {
        if (!this.outputText.value) return;
        
        const content = this.outputText.value;
        const filename = this.currentMode === 'encode' ? 'encoded.txt' : 'decoded.txt';
        const mimeType = 'text/plain';
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Check file size (limit to 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showError('File too large. Maximum size is 10MB.');
            return;
        }
        
        // Check file type
        if (!file.type.startsWith('text/') && file.type !== 'application/json') {
            this.showError('Please select a text file.');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.inputText.value = e.target.result;
            this.handleInputChange();
        };
        
        reader.onerror = () => {
            this.showError('Failed to read file.');
        };
        
        reader.readAsText(file);
        
        // Clear file input
        this.fileInput.value = '';
    }

    clearInput() {
        this.inputText.value = '';
        this.handleInputChange();
        this.clearError();
        this.removeInputErrorState();
        this.inputText.focus();
    }

    clearOutput() {
        this.outputText.value = '';
        this.updateButtonStates();
        this.updateCharacterCounts();
        this.hideStatus();
    }

    showError(message) {
        this.errorText.textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.errorMessage.classList.add('animate-slide-up');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.clearError();
        }, 5000);
    }

    clearError() {
        this.errorMessage.classList.add('hidden');
        this.errorMessage.classList.remove('animate-slide-up');
    }

    addInputErrorState() {
        this.inputText.classList.add('error-state');
    }

    removeInputErrorState() {
        this.inputText.classList.remove('error-state');
    }

    showStatus(type, message) {
        this.statusText.textContent = message;
        
        if (type === 'success') {
            this.statusIcon.className = 'w-2 h-2 rounded-full bg-success';
        } else if (type === 'error') {
            this.statusIcon.className = 'w-2 h-2 rounded-full bg-error';
        }
        
        this.statusIndicator.classList.remove('hidden');
        this.statusIndicator.classList.add('animate-fade-in');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.hideStatus();
        }, 3000);
    }

    hideStatus() {
        this.statusIndicator.classList.add('hidden');
        this.statusIndicator.classList.remove('animate-fade-in');
    }

    updateButtonStates() {
        const hasOutput = this.outputText.value.length > 0;
        
        this.copyBtn.disabled = !hasOutput;
        this.downloadBtn.disabled = !hasOutput;
        
        if (hasOutput) {
            this.copyBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            this.downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            this.copyBtn.classList.add('opacity-50', 'cursor-not-allowed');
            this.downloadBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    updateCharacterCounts() {
        this.inputCharCount.textContent = this.inputText.value.length.toLocaleString();
        this.outputCharCount.textContent = this.outputText.value.length.toLocaleString();
    }

    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + C to copy (when output is focused)
        if ((event.ctrlKey || event.metaKey) && event.key === 'c' && 
            document.activeElement === this.outputText) {
            this.copyToClipboard();
            event.preventDefault();
        }
        
        // Ctrl/Cmd + V to paste (when input is focused)
        if ((event.ctrlKey || event.metaKey) && event.key === 'v' && 
            document.activeElement === this.inputText) {
            setTimeout(() => this.handleInputChange(), 10);
        }
        
        // Ctrl/Cmd + D to download
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            this.downloadResult();
            event.preventDefault();
        }
        
        // Escape to clear input
        if (event.key === 'Escape') {
            this.clearInput();
        }
        
        // Tab to switch modes
        if (event.key === 'Tab' && event.shiftKey && 
            (document.activeElement === this.encodeBtn || 
             document.activeElement === this.decodeBtn)) {
            const newMode = this.currentMode === 'encode' ? 'decode' : 'encode';
            this.switchMode(newMode);
            event.preventDefault();
        }
    }
}

// Utility functions for enhanced user experience
class UIEnhancements {
    static addLoadingState(element, originalText) {
        element.classList.add('loading-dots');
        element.textContent = originalText;
        
        return () => {
            element.classList.remove('loading-dots');
            element.textContent = originalText;
        };
    }
    
    static addHoverEffects() {
        // Add smooth hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('button, textarea, input');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-1px)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    static initTooltips() {
        // Add tooltips for better UX
        const tooltips = {
            'copyBtn': 'Copy result to clipboard (Ctrl+C)',
            'downloadBtn': 'Download result as file (Ctrl+D)',
            'pasteBtn': 'Paste from clipboard (Ctrl+V)',
            'uploadBtn': 'Upload text file',
            'clearInputBtn': 'Clear input (Esc)',
            'clearOutputBtn': 'Clear output'
        };
        
        Object.entries(tooltips).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) {
                element.title = text;
            }
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    static measureProcessingTime(operation, input, output) {
        const startTime = performance.now();
        const result = operation();
        const endTime = performance.now();
        
        const processingTime = endTime - startTime;
        const inputSize = input.length;
        const outputSize = output.length;
        
        console.log(`Processing completed in ${processingTime.toFixed(2)}ms`);
        console.log(`Input size: ${inputSize} chars, Output size: ${outputSize} chars`);
        
        return result;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main application
    const base64Tool = new Base64Tool();
    
    // Add UI enhancements
    UIEnhancements.addHoverEffects();
    UIEnhancements.initTooltips();
    
    // Add focus management for accessibility
    const firstFocusableElement = document.getElementById('inputText');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
    
    // Add service worker registration for offline functionality (if available)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        });
    }
    
    console.log('Base64 Tool initialized successfully');
});