const ContentBonesComponent = () => {
  {
    /**return (
    <div className='border border-indigo-500 shadow rounded-md p-4'>
      <div className='animate-pulse'>
        <div className='flex space-x-4'>
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-4 bg-indigo-600 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-indigo-600 rounded'></div>
              <div className='h-4 bg-indigo-600 rounded w-5/6'></div>
            </div>
          </div>
        </div>
        <div className='flex gap-x-2 mt-4'>
          <div className='h-8 bg-indigo-600 rounded w-28'></div>
          <div className='h-8 bg-indigo-600 rounded w-28'></div>
        </div>
      </div>
    </div>
  );**/
  }
  return (
    <div className='animate-pulse'>
      <div className='grid grid-cols-1 gap-y-2 sm:gap-4 sm:grid-cols-2'>
        <div className='pulse relative rounded-lg border border-blue-600 bg-white px-6 py-6 shadow-sm flex items-center space-x-3'>
          <div className='flex-1 min-w-0'>
            <span className='focus:outline-none flex flex-col gap-y-2'>
              <div className='h-4 bg-indigo-600 rounded w-5/6'></div>
              <div className='h-4 bg-indigo-600 rounded'></div>
            </span>
          </div>
        </div>
        <div className='relative rounded-lg border border-blue-600 bg-white px-6 py-6 shadow-sm flex items-center space-x-3'>
          <div className='flex-1 min-w-0'>
            <span className='focus:outline-none flex flex-col gap-y-2'>
              <div className='h-4 bg-indigo-600 rounded w-5/6'></div>
              <div className='h-4 bg-indigo-600 rounded'></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBonesComponent;
