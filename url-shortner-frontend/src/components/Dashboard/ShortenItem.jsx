import React from 'react';
import dayjs from 'dayjs';
import { MdOutlineAdsClick } from 'react-icons/md';

const ShortenItem = ({ item, isActive, onSelect }) => {
    const { originalUrl, shortUrl, clickCount, createdAt } = item;

    const displayTitle = originalUrl.replace(/^https?:\/\/(www\.)?/, "");

    return (
        <div
            onClick={onSelect}
            className={`border-l-4 p-4 rounded-r-xl border-y border-r transition-all duration-150 cursor-pointer shadow-sm text-left flex flex-col gap-2 font-roboto ${isActive
                ? "bg-orange-50/50 border-l-accent-orange border-y-orange-100/70 border-r-orange-100/70 shadow-orange-50"
                : "bg-white border-l-transparent border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
        >
            <div className="flex justify-between items-start gap-3">
                <h4 className="text-sm font-bold text-primary-navy truncate flex-1 font-montserrat" title={originalUrl}>
                    {displayTitle}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider mt-0.5">
                    {dayjs(createdAt).format("MMM DD")}
                </span>
            </div>

            <div className="text-xs font-bold text-accent-orange truncate">
                {import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, "") + shortUrl}
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                    <MdOutlineAdsClick className="text-sm text-slate-400" />
                    <span>{clickCount} {clickCount === 1 ? "click" : "clicks"}</span>
                </span>
            </div>
        </div>
    );
};

export default ShortenItem;