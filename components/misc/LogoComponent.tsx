import Link from 'next/link';

const LogoComponent = ({ ...modifiers }) => {
  return (
    <Link href='/'>
      <a>
        <span className='sr-only'>Symmetry</span>
        <img
          className='h-10'
          {...modifiers}
          src='/symmetry.svg'
          alt='Symmetry Logo'
        />
      </a>
    </Link>
  );
};

export default LogoComponent;
