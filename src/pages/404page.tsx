import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='container px-3 mx-auto h-screen items-center flex flex-col justify-center gap-12'>
      <div className='text-9xl text-[#609AF4] font-bold'>OOPS!</div>
      <div className='text-4xl text-center font-bold'>We can't find the page you're looking for.</div>
      <Link to="/" className='border-[#609AF4] border-2 px-5 py-3 rounded-md text-center text-[#609AF4] font-bold w-60'>Visit homepage</Link>
    </div>
  );
};
export default NotFoundPage
