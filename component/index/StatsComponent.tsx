/* This example requires Tailwind CSS v2.0+ */
const StatsComponent = () => {
  return (
    <div className='bg-indigo-600'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
            The only research accelerating tool students love
          </h2>
          <p className='mt-3 text-xl text-indigo-200 sm:mt-4'>
            Check out of these numbers from students that used Symmetry to write
            their last essay:
          </p>
        </div>
        <dl className='mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8'>
          <div className='flex flex-col'>
            <dt className='order-2 mt-2 text-lg leading-6 font-medium text-indigo-200'>
              of students finished faster
            </dt>
            <dd className='order-1 text-5xl font-extrabold text-white'>100%</dd>
          </div>
          <div className='flex flex-col mt-10 sm:mt-0'>
            <dt className='order-2 mt-2 text-lg leading-6 font-medium text-indigo-200'>
              of research found was used
            </dt>
            <dd className='order-1 text-5xl font-extrabold text-white'>80%</dd>
          </div>
          <div className='flex flex-col mt-10 sm:mt-0'>
            <dt className='order-2 mt-2 text-lg leading-6 font-medium text-indigo-200'>
              of students cut research time in half
            </dt>
            <dd className='order-1 text-5xl font-extrabold text-white'>50%</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default StatsComponent;
