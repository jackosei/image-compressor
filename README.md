# Image Compressor

A robust Node.js application for efficient image compression and format conversion, powered by the Tinify API. Designed with a dual-mode architecture to support both automated local directory monitoring and an intuitive web interface with batch processing capabilities.

## Features

- **Dual Mode Architecture**:
  - **Online Mode**: Web-based drag-and-drop interface with batch processing support
  - **Local Mode**: Automated filesystem watcher for background batch processing
- **Batch Processing**: Compress multiple images simultaneously with progress tracking
- **Format Conversion**: Support for converting to JPEG, PNG, WebP, and AVIF
- **Smart Compression**: Lossy compression algorithm that preserves visual quality
- **ZIP Downloads**: Download all compressed images as a single ZIP file
- **Modern UI**: Clean, responsive interface with glassmorphism design

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Services**: Tinify API
- **Utilities**: Chokidar (File Watching), Multer (File Handling), Archiver (ZIP creation)
- **Frontend**: Vanilla HTML/CSS/JS with Lucide Icons

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- A Tinify API key (see below for instructions)

### Getting Your Free Tinify API Key

1. **Visit TinyPNG Developers**: Go to [https://tinypng.com/developers](https://tinypng.com/developers)
2. **Sign Up**: Enter your email and name
3. **Verify Email**: Check your inbox for a verification email
4. **Get Your Key**: Once verified, you'll receive your API key
5. **Free Tier**: 500 compressions per month, completely free!

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jackosei/image-compressor.git
   cd image-compressor
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory with your Tinify API key:

   ```env
   TINIFY_KEY=your_api_key_from_tinypng
   # Optional: Set default mode (online/local)
   APP_MODE=online
   # Optional: Set local mode output format
   OUTPUT_FORMAT=original
   # Optional: Set port (default: 3000)
   PORT=3000
   ```

4. **Start the application**:

   ```bash
   npm start
   ```

5. **Access the web interface**:
   Navigate to `http://localhost:3000`

## Usage

### Online Mode (Default)

The web interface supports both single and batch image compression:

**Single File:**

1. Drag & drop or click to select an image
2. Choose output format (optional)
3. Download compressed image

**Batch Processing:**

1. Select multiple images (up to 20)
2. Watch real-time compression progress for each file
3. Download individually or all files as ZIP

### Local Mode

Enable automated directory monitoring:

```bash
APP_MODE=local npm start
```

- Place images in the `uploads/` directory
- Compressed files automatically appear in `converted/`
- Set output format via `OUTPUT_FORMAT` in `.env`

## Production Deployment

### Important: Free Tier Limitations

The hosted version at [your-domain.com] uses my personal Tinify API key and is limited to **5 compressions per user** to preserve API credits.

**Want unlimited compressions?**

- Clone this repository
- Get your own free API key (500 compressions/month)
- Run locally or deploy to your own server
- Enjoy unlimited batch processing!

## Project Structure

```
image-compressor/
├── src/
│   ├── server.js           # Main application entry
│   ├── modes/
│   │   ├── online.js       # Web interface routes
│   │   └── local.js        # Directory watcher
│   └── services/
│       └── tinifyService.js # Image compression logic
├── public/
│   ├── index.html          # Web UI
│   ├── script.js           # Frontend logic
│   └── style.css           # Styling
├── uploads/                # Input directory (local mode)
└── converted/              # Output directory (local mode)
```

## Configuration Options

| Variable        | Description                           | Default    |
| --------------- | ------------------------------------- | ---------- |
| `TINIFY_KEY`    | Your Tinify API key                   | Required   |
| `APP_MODE`      | Application mode: `online` or `local` | `online`   |
| `OUTPUT_FORMAT` | Local mode output format              | `original` |
| `PORT`          | Server port                           | `3000`     |

## API Limits

- **Free Tier**: 500 compressions/month
- **Batch Limit**: 20 images per batch
- **File Size**: Maximum 10MB per image
- **Supported Formats**: JPEG, PNG, WebP

## FAQ

**Q: Why is the hosted version limited to 5 compressions?**
A: To protect my personal API credits while offering a free demo.

**Q: How do I get unlimited compressions?**
A: Clone this repo, get your own free Tinify API key, and run it locally!

**Q: Can I process more than 20 images at once?**
A: When running locally, you can modify the batch limit in `src/modes/online.js`.

**Q: Is my data safe?**
A: Images are processed temporarily and automatically deleted. See our [Privacy Policy](#) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes!

---

**Built with ❤️ by [Jack Osei](https://jackosei.com)**

Get the code: [GitHub Repository](https://github.com/jackosei/image-compressor)
