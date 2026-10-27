import React from 'react'
import ShortenItem from './ShortenItem'

const ShortenUrlList = ({ data, selectedItem, onSelect }) => {
  return (
    <div className='space-y-3 pr-1 overflow-y-auto max-h-[calc(100vh-220px)]'>
        {data?.map((item) => (
            <ShortenItem 
              key={item.id} 
              item={item}
              isActive={selectedItem && selectedItem.id === item.id}
              onSelect={() => onSelect(item)}
            />
        ))}
    </div>
  )
}

export default ShortenUrlList