import { useEffect } from 'react';
import { Modal, Spinner } from 'flowbite-react';
import {FaTrashAlt} from '@react-icons/all-files/fa/FaTrashAlt'
import { useAppSelector } from '../hooks';
import Hero from '../models/Hero';

const HeroDisplayModal = ({
  visible,
  hero,
  onClose,
  onDelete,
}: {
  visible: boolean;
  hero: Hero;
  onClose: () => void;
  onDelete: () => void;
}) => {
  const heroState = useAppSelector((state) => state.heroes);
  useEffect(() => {
    if (heroState.isFailed) {
      window.alert('DungDai');
    }
  }, [heroState]);
  return (
    <>
      <Modal show={visible} size="lg" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <div>
              <div className="mb-2 flex justify-center">
                <img src={hero.avatarUrl} className='w-40 h-40' />
              </div>
              <div className="mb-1 text-center font-bold text-lg">
                {hero.fullName}
              </div>
              <div className="mb-5 text-center text-lg">
                {hero.type.name}
              </div>
              <div className="mb-2 text-center text-lg">
                {hero.description}
              </div>
            </div>
            <div className="w-full">
              <button onClick={onDelete} className='w-full py-3 flex justify-center items-center gap-3'>
                {heroState.isLoading ? <Spinner /> : <FaTrashAlt color='red'/>}
                <span className="pl-1 text-red-500 font-bold">Delete hero</span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HeroDisplayModal;
