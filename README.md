# File Upload & OCR Converter

## Prerequisites
- PHP 7.4+
- cURL extension enabled
- OCR.space API key

## Setup Steps

1. Clone the repository
2. Run the application:
```bash
php -S localhost:8000
```

4. Open `http://localhost:8000` in your browser

## Features
- Drag and drop file upload
- OCR text extraction
- Language selection
- Multiple file support
- Daily upload limit (5 files)

## API Configuration
Modify language and format in `process.php`:
- Supported Languages: English, Spanish, French, German
- Output Formats: Plain Text, JSON