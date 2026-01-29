# Image Compressor

A robust Node.js application for efficient image compression and format conversion, powered by the Tinify API. Designed with a dual-mode architecture to support both automated local directory monitoring and an intuitive web interface.

## Features

- **Dual Mode Architecture**:
  - **Online Mode**: Web-based drag-and-drop interface for individual file processing.
  - **Local Mode**: Automated filesystem watcher for background batch processing.
- **Format Conversion**: Support for converting inputs to JPEG, PNG, WebP, and AVIF.
- **Smart Compression**: Lossy compression algorithm that preserves visual quality.
- **Modern UI**: Clean, responsive interface with a technical aesthetic.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Services**: Tinify API
- **Utilities**: Chokidar (File Watching), Multer (File Handling)
- **Frontend**: Vanilla HTML/CSS/JS

## Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   TINIFY_KEY=your_api_key_here
   # Optional: Set default mode (online/local)
   APP_MODE=online
   # Optional: Set local mode output format (original/jpeg/png/webp/avif)
   OUTPUT_FORMAT=original
   ```

## Usage

### Online Mode (Default)

Start the server and access the web interface.

```bash
npm start
```

Navigate to `http://localhost:3000` to compress and convert images.

### Local Mode

Enable local directory watching by setting `APP_MODE=local` in your `.env` file or running:

```bash
APP_MODE=local npm start
```

- Place images in the `uploads` directory.
- Compressed files will be automatically generated in the `converted` directory.
- Control output format via `OUTPUT_FORMAT` in `.env`.

## Project Structure

- `src/`: Backend source code
- `public/`: Static frontend assets
- `uploads/`: Input directory for local mode
- `converted/`: Output directory for local mode

---

_Developed by Jack Osei_
