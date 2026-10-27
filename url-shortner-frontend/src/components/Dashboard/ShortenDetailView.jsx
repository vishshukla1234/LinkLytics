import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Graph from './Graph';
import QRCodeModal from './QRCodeModal';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopy, IoQrCode } from "react-icons/io5";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineAdsClick } from "react-icons/md";
import { LiaCheckSolid } from "react-icons/lia";
import { Hourglass } from 'react-loader-spinner';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const ShortenDetailView = ({ item, token }) => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [qrCodeOpen, setQrCodeOpen] = useState(false);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!item || !item.shortUrl) return;
            setLoading(true);
            try {
                const { data } = await api.get(
                    `/api/urls/analytics/${item.shortUrl}?startDate=2025-01-01T00:00:00&endDate=2035-01-01T00:00:00`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                setAnalyticsData(data);
            } catch (err) {
                console.error("Failed to fetch analytics for link", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
        setIsCopied(false);
    }, [item?.shortUrl, token]);

    if (!item) {
        return (
            <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-8 h-96 flex flex-col justify-center items-center text-slate-400 font-roboto">
                <span className="text-5xl mb-4 font-montserrat text-slate-200">🔍</span>
                <h3 className="text-slate-700 font-bold text-lg mb-1">No Link Selected</h3>
                <p className="text-slate-400 text-sm text-center max-w-[250px]">Select a shortened URL from the list to view its performance details.</p>
            </div>
        );
    }

    const shortLinkFull = `${import.meta.env.VITE_REACT_FRONT_END_URL}${item.shortUrl}`;

    return (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 w-full font-roboto">
            {/* Header info */}
            <div className="flex flex-col gap-1 text-left font-roboto min-w-0">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Created {dayjs(item.createdAt).format("MMM DD, YYYY")}</span>
                <h2 className="text-xl sm:text-2xl font-black text-primary-navy font-montserrat truncate" title={item.originalUrl}>
                    {item.originalUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </h2>
            </div>

            {/* Link details box */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-0.5 overflow-hidden w-full sm:w-auto text-left">
                    <a
                        href={shortLinkFull}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-bold text-accent-orange hover:underline flex items-center gap-2"
                    >
                        {shortLinkFull.replace(/^https?:\/\//, "")}
                        <FaExternalLinkAlt className="text-xs text-accent-orange/70" />
                    </a>
                    <span className="text-sm text-slate-500 truncate block max-w-sm" title={item.originalUrl}>
                        {item.originalUrl}
                    </span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto shrink-0">
                    <CopyToClipboard text={shortLinkFull} onCopy={() => {
                        setIsCopied(true);
                        toast.success("Short URL copied!");
                        setTimeout(() => setIsCopied(false), 2000);
                    }}>
                        <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-accent-orange hover:bg-accent-orange-hover text-white text-sm font-bold px-4 py-2.5 rounded-xl cursor-pointer transition shadow-md shadow-orange-100">
                            {isCopied ? <LiaCheckSolid className="text-lg" /> : <IoCopy className="text-base" />}
                            {isCopied ? "Copied" : "Copy"}
                        </button>
                    </CopyToClipboard>

                    <button
                        onClick={() => setQrCodeOpen(true)}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-bold px-4 py-2.5 rounded-xl cursor-pointer transition"
                    >
                        <IoQrCode className="text-base text-slate-500" />
                        QR Code
                    </button>
                </div>
            </div>

            {/* Engagements details */}
            <div className="flex flex-wrap gap-6 sm:gap-12 border-t border-b border-slate-100 py-5 text-left">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Engagements</span>
                    <div className="flex items-center gap-1.5 text-2xl font-black text-slate-800 mt-1">
                        <MdOutlineAdsClick className="text-slate-700" />
                        {item.clickCount}
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Status</span>
                    <span className="text-base font-bold text-green-600 mt-2 flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
                        Active
                    </span>
                </div>
            </div>

            {/* Performance Graph */}
            <div className="flex flex-col gap-4 text-left">
                <h3 className="text-lg font-bold text-primary-navy font-montserrat">Performance Over Time</h3>
                <div className="h-64 relative border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                    {loading ? (
                        <div className="absolute inset-0 flex justify-center items-center bg-white/70 rounded-2xl">
                            <Hourglass
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="hourglass-loading"
                                colors={['#ff6100', '#ff8b3d']}
                            />
                        </div>
                    ) : analyticsData.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                            <h4 className="text-slate-800 font-bold text-base mb-1 font-montserrat">No Click Data Yet</h4>
                            <p className="text-slate-500 text-sm text-center max-w-[280px]">Share your short link to start tracking geographical and click statistics.</p>
                        </div>
                    ) : (
                        <Graph graphData={analyticsData} />
                    )}
                </div>
            </div>

            <QRCodeModal
                open={qrCodeOpen}
                onClose={() => setQrCodeOpen(false)}
                url={shortLinkFull}
                shortUrl={item.shortUrl}
            />
        </div>
    );
};

export default ShortenDetailView;
