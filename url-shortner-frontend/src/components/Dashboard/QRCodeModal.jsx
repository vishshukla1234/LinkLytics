import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { RxCross2 } from 'react-icons/rx';
import { FiDownload } from 'react-icons/fi';
import QRCode from 'qrcode';

const QRCodeModal = ({ open, onClose, url, shortUrl }) => {
    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        if (open && url) {
            QRCode.toDataURL(url, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#0f172a', // slate-900
                    light: '#ffffff'
                }
            })
            .then(dataUrl => {
                setQrUrl(dataUrl);
            })
            .catch(err => {
                console.error("Failed to generate QR code", err);
            });
        }
    }, [open, url]);

    const handleDownload = () => {
        if (!qrUrl) return;
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = `${shortUrl || 'shorturl'}-qrcode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="qrcode-modal-title"
            aria-describedby="qrcode-modal-description"
        >
            <div className="flex justify-center items-center h-full w-full p-4">
                <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-[360px] border border-slate-100 flex flex-col items-center relative font-montserrat animate-in fade-in zoom-in-95 duration-200">
                    
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100"
                    >
                        <RxCross2 className="text-2xl" />
                    </button>

                    <h2 id="qrcode-modal-title" className="font-bold text-slate-800 text-xl text-center mt-2">
                        QR Code
                    </h2>
                    <p id="qrcode-modal-description" className="text-slate-500 text-sm text-center mb-6 mt-1">
                        Scan or download this QR code
                    </p>

                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-center shadow-inner mb-5">
                        {qrUrl ? (
                            <img src={qrUrl} alt="Short URL QR Code" className="w-44 h-44 object-contain rounded-lg" />
                        ) : (
                            <div className="w-44 h-44 flex items-center justify-center text-slate-400">
                                Generating...
                            </div>
                        )}
                    </div>

                    <div className="w-full text-center mb-6">
                        <span className="text-xs text-blue-600 font-semibold bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg truncate block select-all">
                            {url}
                        </span>
                    </div>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handleDownload}
                            disabled={!qrUrl}
                            className="flex-1 py-2.5 rounded-xl text-white font-semibold text-sm btn-gradient bg-custom-gradient shadow-md shadow-blue-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-1.5 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <FiDownload className="text-base" />
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default QRCodeModal;
