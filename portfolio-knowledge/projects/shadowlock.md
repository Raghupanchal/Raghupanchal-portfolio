# ShadowLock - Cybersecurity & Steganography Suite

## Project Overview
**ShadowLock** is a cybersecurity intelligence and computer vision application combining robust cryptographic encryption, hidden steganographic payload embedding, and real-time vision pipelines.

## Key Capabilities & Features
1. **AES-256 Bit Cryptography**: Encrypts secret text, credentials, or files using symmetric AES-256 encryption.
2. **LSB Steganography (Image & Audio)**: Embeds encrypted binary payloads into the Least Significant Bits (LSB) of PNG/JPEG images or WAV audio files without visible or audible degradation.
3. **Facial Expression & Mood Analysis**: Integrates OpenCV computer vision to detect real-time user facial expressions and sentiment overlays.
4. **Dual Interface**: Provides a Tkinter desktop GUI for local workflows and a FastAPI web layer for remote access.

## Technical Stack
- **Languages & Frameworks**: Python 3.11, FastAPI, Tkinter, OpenCV, `cryptography` (AES-256), NumPy
- **Packaging**: Docker-containerized for cross-platform deployment
