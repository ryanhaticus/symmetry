const SearchTabComponent = () => {
  return (
    <>
      <form>
        <div>
          <label
            htmlFor='topic'
            className='block text-md font-medium text-gray-700'
          >
            Research topic
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='topic'
              id='topic'
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
              placeholder='Gun control in the United States'
              aria-describedby='topic-description'
            />
          </div>
          <p className='mt-2 text-sm text-gray-500' id='topic-description'>
            Enter your research topic in the above field and hit search. We'll
            do our best to provide you with powerful research you can cite from
            scholarly sources.
          </p>
        </div>
      </form>
      <div className='pt-16 flex items-center justify-center'>
        <img
          src='/img/inspection.svg'
          alt='Drawing of a person searching the web'
        />
      </div>
    </>
  );
};

export default SearchTabComponent;
