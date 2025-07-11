# Base64 Encoder/Decoder PWA

A modern, fast, and user-friendly Progressive Web Application (PWA) for encoding and decoding Base64 text. Built with vanilla JavaScript and styled with Tailwind CSS, this tool provides real-time processing with offline capabilities.

## 🚀 Features

### Core Functionality
- **Real-time Processing**: Instant encoding and decoding as you type
- **Bidirectional Conversion**: Switch between encode and decode modes seamlessly
- **Input Validation**: Smart validation with error handling and visual feedback
- **Character Counting**: Live character count for both input and output

### User Experience
- **Clean Interface**: Modern, responsive design that works on all devices
- **Keyboard Shortcuts**: Efficient workflow with keyboard navigation
- **Copy & Paste**: One-click clipboard operations
- **File Upload**: Support for text file uploads (up to 10MB)
- **Download Results**: Save encoded/decoded text as files
- **Error Handling**: Clear error messages with auto-dismiss

### PWA Capabilities
- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile and desktop
- **App Shortcuts**: Quick access to encode/decode modes
- **Service Worker**: Caching for fast loading and offline functionality
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 📱 Installation

### As a Web App
1. Visit the application URL in your browser
2. Click the "Install" button or "Add to Home Screen" option
3. The app will be installed and available offline

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/zhouhao/simple-base64-web.git
   cd simple-base64-web
   ```

2. Serve the files using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open `http://localhost:8000` in your browser

## 🎯 Usage

### Basic Operations
1. **Encoding Text to Base64**:
   - Select "Encode" mode (default)
   - Enter your plain text in the input area
   - The Base64 result appears instantly in the output area

2. **Decoding Base64 to Text**:
   - Click "Decode" mode
   - Paste your Base64 encoded text in the input area
   - The decoded text appears in the output area

### Advanced Features
- **File Upload**: Click "Upload File" to encode/decode text files
- **Copy Results**: Use the "Copy Result" button or Ctrl+C
- **Download**: Save results as text files with the "Download" button
- **Clear**: Use clear buttons or press Escape to reset inputs
- **Paste**: Quick paste with the "Paste" button or Ctrl+V

### Keyboard Shortcuts
- `Ctrl/Cmd + C`: Copy output (when output is focused)
- `Ctrl/Cmd + V`: Paste to input (when input is focused)
- `Ctrl/Cmd + D`: Download result
- `Escape`: Clear input
- `Shift + Tab`: Switch between encode/decode modes

## 🛠 Technical Details

### Technologies Used
- **HTML5**: Semantic markup with PWA manifest
- **CSS3**: Modern styling with Tailwind CSS
- **JavaScript (ES6+)**: Vanilla JavaScript with modern features
- **Service Worker**: For offline functionality and caching
- **Web App Manifest**: PWA configuration

### Browser Support
- Chrome/Chromium 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### File Structure
```
base64-tool/
├── index.html          # Main application file
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
├── css/
│   └── styles.css     # Custom styles
├── js/
│   └── main.js        # Application logic
└── icons/
    └── icon.svg       # App icon
```

### Key Features Implementation
- **Real-time Processing**: Debounced input handling for performance
- **Error Handling**: Comprehensive validation and user feedback
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized for fast loading and smooth interactions
- **Security**: Client-side processing, no data transmission

## 🔒 Privacy & Security

- **No Data Collection**: All processing happens locally in your browser
- **No Server Communication**: Text never leaves your device
- **Offline Capable**: Works completely offline after initial load
- **No Tracking**: No analytics or tracking scripts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you're using a supported browser
3. Try refreshing the page or clearing browser cache
4. For file uploads, ensure the file is a text file under 10MB

## 🎨 Customization

The application uses Tailwind CSS for styling. You can customize the appearance by modifying the CSS classes in `index.html` or adding custom styles to `css/styles.css`.

---

**Made with ❤️ for developers and anyone who needs reliable Base64 encoding/decoding**