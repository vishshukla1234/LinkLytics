import React, { useState, useEffect } from 'react'
import Graph from './Graph'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import ShortenUrlList from './ShortenUrlList'
import ShortenDetailView from './ShortenDetailView'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { FaLink, FaChartBar, FaPlus } from 'react-icons/fa'

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const [shortenPopUp, setshortenPopUp] = useState(false);
  const [activeTab, setActiveTab] = useState("links");
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const navigate = useNavigate();

  const { isPending, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError);
  const { isPending: loader, data: totalClicks } = useFetchTotalClicks(token, onError);

  function onError() {
    navigate("/error");
  }

  // Set default selected item once short links load
  useEffect(() => {
    if (myShortenUrls && myShortenUrls.length > 0) {
      if (!selectedItem) {
        setSelectedItem(myShortenUrls[0]);
      } else {
        const stillExists = myShortenUrls.find(item => item.id === selectedItem.id);
        if (stillExists) {
          setSelectedItem(stillExists);
        } else {
          setSelectedItem(myShortenUrls[0]);
        }
      }
    } else {
      setSelectedItem(null);
    }
  }, [myShortenUrls]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setMobileDetailOpen(true);
  };

  const handleCreateNewSuccess = async () => {
    await refetch();
    // After refetching, the list will update.
  };

  const calculateTotalClicksCount = () => {
    if (!myShortenUrls) return 0;
    return myShortenUrls.reduce((sum, item) => sum + (item.clickCount || 0), 0);
  };

  return (
    <div className='min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col md:flex-row font-roboto'>
      {/* Sidebar navigation */}
      <aside className='w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:p-6 p-3 flex md:flex-col flex-row md:gap-6 gap-3 shrink-0 items-center md:items-stretch overflow-x-auto'>
        {/* Create Link button */}
        <button
          onClick={() => setshortenPopUp(true)}
          className='flex items-center justify-center gap-2 bg-accent-orange hover:bg-accent-orange-hover text-white font-bold md:py-3 py-2 md:px-4 px-3 rounded-xl transition duration-200 shadow-md shadow-orange-100 cursor-pointer shrink-0 md:w-full text-sm'
        >
          <FaPlus />
          <span className='hidden xs:inline md:inline'>Create New</span>
          <span className='inline xs:hidden md:hidden'>New</span>
        </button>

        <hr className='text-slate-100 md:block hidden' />

        {/* Navigation tabs */}
        <div className='flex md:flex-col flex-row gap-1 md:gap-1'>
          <button
            onClick={() => {
              setActiveTab("links");
              setMobileDetailOpen(false);
            }}
            className={`flex items-center gap-2 md:gap-3 md:px-4 px-3 md:py-3 py-2 rounded-xl font-bold text-sm transition text-left cursor-pointer whitespace-nowrap ${activeTab === "links"
                ? "bg-orange-50 text-accent-orange font-extrabold"
                : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <FaLink className='text-base shrink-0' />
            Links
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 md:gap-3 md:px-4 px-3 md:py-3 py-2 rounded-xl font-bold text-sm transition text-left cursor-pointer whitespace-nowrap ${activeTab === "analytics"
                ? "bg-orange-50 text-accent-orange font-extrabold"
                : "text-slate-600 hover:bg-slate-50"
              }`}
          >
            <FaChartBar className='text-base shrink-0' />
            <span className='hidden xs:inline'>Overall Analytics</span>
            <span className='inline xs:hidden'>Analytics</span>
          </button>
        </div>
      </aside>

      {/* Main content viewport */}
      <main className='flex-1 p-4 md:p-8 overflow-y-auto md:max-h-[calc(100vh-64px)] min-w-0'>
        {isPending || loader ? (
          <Loader />
        ) : (
          <>
            {/* LINKS TAB VIEW */}
            {activeTab === "links" && (
              <>
                {!myShortenUrls || myShortenUrls.length === 0 ? (
                  <div className='flex flex-col justify-center items-center py-20 text-center bg-white border border-slate-100 rounded-2xl p-8 max-w-lg mx-auto shadow-sm'>
                    <span className='text-6xl mb-4'>🔗</span>
                    <h2 className='text-xl font-bold text-primary-navy font-montserrat mb-2'>No Links Created</h2>
                    <p className='text-slate-500 mb-6 text-sm max-w-sm'>
                      Create your first shortened link to get started sharing, generating QR codes, and tracking click performance!
                    </p>
                    <button
                      onClick={() => setshortenPopUp(true)}
                      className='bg-accent-orange hover:bg-accent-orange-hover text-white font-bold py-2.5 px-6 rounded-xl transition cursor-pointer shadow-md shadow-orange-100'
                    >
                      Create a Link
                    </button>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 items-start'>
                    {/* Left column: List of links */}
                    <div className={`${mobileDetailOpen ? 'hidden' : 'block'} lg:block lg:col-span-2 flex flex-col gap-3`}>
                      <div className='flex justify-between items-center px-1 mb-1'>
                        <span className='text-sm font-bold text-slate-500 uppercase tracking-wider font-montserrat'>
                          Your Links ({myShortenUrls.length})
                        </span>
                      </div>

                      <ShortenUrlList
                        data={myShortenUrls}
                        selectedItem={selectedItem}
                        onSelect={handleSelectItem}
                      />
                    </div>

                    {/* Right column: Selected link details */}
                    <div className={`${mobileDetailOpen ? 'block' : 'hidden'} lg:block lg:col-span-3`}>
                      {/* Back button for mobile view */}
                      <button
                        onClick={() => setMobileDetailOpen(false)}
                        className='lg:hidden mb-4 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 cursor-pointer'
                      >
                        ← Back to Links List
                      </button>

                      <ShortenDetailView
                        item={selectedItem}
                        token={token}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* OVERALL ANALYTICS TAB VIEW */}
            {activeTab === "analytics" && (
              <div className='flex flex-col gap-6 max-w-5xl mx-auto'>
                <h2 className='text-2xl font-black text-primary-navy font-montserrat text-left'>Overall Dashboard Analytics</h2>

                {/* Aggregate Summary Stats Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-left flex flex-col gap-1'>
                    <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Links Created</span>
                    <span className='text-3xl font-black text-primary-navy font-montserrat'>{myShortenUrls?.length || 0}</span>
                  </div>

                  <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-left flex flex-col gap-1'>
                    <span className='text-xs font-bold text-slate-400 uppercase tracking-wider'>Total Engagements (Clicks)</span>
                    <span className='text-3xl font-black text-primary-navy font-montserrat'>{calculateTotalClicksCount()}</span>
                  </div>
                </div>

                {/* Aggregate Engagements Graph */}
                <div className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex flex-col gap-4 text-left'>
                  <h3 className='text-lg font-bold text-primary-navy font-montserrat'>Click Performance (Last 30 Days)</h3>

                  <div className='h-96 relative border border-slate-100 rounded-2xl p-4 bg-slate-50/50'>
                    {totalClicks?.length === 0 ? (
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                        <h4 className="text-slate-800 font-bold text-base mb-1 font-montserrat">No Data For This Period</h4>
                        <p className="text-slate-500 text-sm text-center max-w-xs">Share your short link to view aggregate engagements.</p>
                      </div>
                    ) : (
                      <Graph graphData={totalClicks} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <ShortenPopUp
        refetch={handleCreateNewSuccess}
        open={shortenPopUp}
        setOpen={setshortenPopUp}
      />
    </div>
  )
}

export default DashboardLayout

