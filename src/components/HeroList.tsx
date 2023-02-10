import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'flowbite-react';

import { fetchHeroes, deleteHero, loadHeroes } from '../store/heroes-slice';
import Hero from '../models/Hero';
import HeroDisplayModal from './HeroDisplayModal';
import LoadingPage from '../pages/Loading';
import { useAppDispatch, useAppSelector } from '../hooks';

const HeroList = () => {

  const heroState = useAppSelector((state) => state.heroes);
  const dispatch = useAppDispatch();
  const [display_modal_visible, setDisplayModalVisible] = useState(false);
  const [hero, setHero] = useState({
    id: '',
    avatarUrl: '',
    fullName: '',
    typeId: '',
    description: '',
    type: {
      id: '',
      name: '',
    },
  });
  const [element, setElement] = useState<any>(null);
  const showDisplayModal = () => {
    setDisplayModalVisible(true);
  };
  const closeDisplayModal = () => {
    setDisplayModalVisible(false);
  };
  const onDeleteHero = () => {
    dispatch(deleteHero(hero.id));
  };
  const loader = useRef(loadHeroes);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);
  const router = useNavigate();
  useEffect(() => {
    if (heroState.heroes.data.length > 0) {
      if (id) {
        const hero = heroState.heroes.data.find((hero: Hero) => {
          return hero.id === id;
        });
        if (hero) {
          setHero(hero);
          setDisplayModalVisible(true);
        } else {
          router('/not-found');
        }
      }
    }
  }, [heroState.heroes]);
  useEffect(() => {
    loader.current = loadHeroes;
  }, [loadHeroes]);
  const observer = useRef(
    new IntersectionObserver(
      (entries: any) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          dispatch(loadHeroes());
        }
      },
      { threshold: 1 },
    ),
  );
  useEffect(() => {
    if (element) {
      observer.current.observe(element);
    }
    return () => {
      if (element) {
        observer.current.unobserve(element);
      }
    };
  }, [element]);
  const onRowClick = (id: string) => {
    const hero = heroState.heroes.data.find((hero: Hero) => {
      return hero.id === id;
    });
    setHero(hero);
    showDisplayModal();
  };
  return (
    <>
    {heroState.isLoading?<LoadingPage/>:
    <div className="w-full pt-10">
      <div className="hidden md:flex py-5 text-lg font-bold text-gray-500">
        <div className="flex-1">Heroes</div>
        <div className="flex-1">Type</div>
        <div className="flex-[2]">Description</div>
      </div>
      <div className="flex flex-col gap-3 text-xl">
        {heroState.dataChunk.map((hero: Hero, index: number) => {
          return (
            <>
              <div key={hero.id}>
                <div
                  className="md:flex p-5 cursor-pointer rounded-xl items-center hidden bg-white"
                  key={index * 2}
                  onClick={() => onRowClick(hero.id)}
                >
                  <div className="flex-1 flex gap-10 items-center">
                    <img src={hero.avatarUrl} className="w-16 h-16" />
                    <span className="font-bold">{hero.fullName}</span>
                  </div>
                  <div className="flex-1">{hero.type.name}</div>
                  <div className="flex-[2] line-clamp-1">
                    {hero.description}
                  </div>
                </div>
                <div
                  className="p-5 cursor-pointer bg-white rounded-xl md:hidden"
                  key={index * 2 + 1}
                  onClick={() => onRowClick(hero.id)}
                >
                  <div className="flex gap-5 items-center">
                    <img src={hero.avatarUrl} className="w-16 h-16" />
                    <div>
                      <div className="font-bold text-lg pb-2">
                        {hero.fullName}
                      </div>
                      <div className="flex-1 text-md">{hero.type.name}</div>
                    </div>
                  </div>
                  <div className="line-clamp-1 pt-3">{hero.description}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div>
        {heroState.isLoadMore && <Spinner />}
        {!heroState.isLoading && heroState.isLoadMore && (
          <div ref={setElement}></div>
        )}
      </div>
      {display_modal_visible && (
        <HeroDisplayModal
          visible={display_modal_visible}
          hero={hero}
          onClose={closeDisplayModal}
          onDelete={onDeleteHero}
        />
      )}
    </div>
      }
      </>
  );
};

export default HeroList;
