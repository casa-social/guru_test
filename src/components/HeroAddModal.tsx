import React, { useEffect, useState } from 'react';
import {
  Modal,
  Label,
  TextInput,
  Select,
  Textarea,
  Spinner,
} from 'flowbite-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchTypes, addHero } from '../store/heroes-slice';
import { isValidURL } from '../utils';
import HeroType from '../models/HeroType';
import avocado from '../assets/images/avocado.png';

interface errorObject {
  [key: string]: any;
}
const HeroAddModal = ({
  visible,
  close,
}: {
  visible: boolean;
  close: () => void;
}) => {
  const heroState = useAppSelector((state) => state.heroes);
  const [errors, setErrors] = useState<errorObject>({});
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [heroType, setHeroType] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  useEffect(() => {
    if (heroState.isFailed) {
      window.alert('Server error!')
    } else {
      close();
    }
  }, [heroState.isFailed]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: errorObject = {};
    if (avatarUrl === '') {
      errors.avatarUrl = 'Please input avatar url!';
    }
    if (!isValidURL(avatarUrl)) {
      errors.avatarUrl = "AvatarUrl must be an URL address!";
    }
    if (fullName === '') {
      errors.fullName = 'Please input fullname!';
    }
    if (heroType === '') {
      errors.heroType = 'Please select hero type!';
    }
    if (description === '') {
      errors.description = 'Please input description!';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      const data = {
        avatarUrl: avatarUrl,
        fullName: fullName,
        typeId: heroType,
        description: description,
      };
      dispatch(addHero(data));
    }
  };
  return (
    <>
      <Modal show={visible} size="xl" popup={true} onClose={close}>
        <Modal.Header />
        <Modal.Body>
          <form className="flex flex-col gap-4 text-lg" onSubmit={(e) => onSubmit(e)}>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add hero
              </h3>
              <div>
                <div>
                  <img src={avocado} className="w-40 h-40" />
                </div>
                <div className="mb-2 block pt-5">
                  <Label htmlFor="avatarUrl" value="Avatar URL" />
                </div>
                <TextInput
                  id="avatarUrl"
                  className="dark:border-gray-500 dark:bg-gray-600"
                  placeholder="abc.com"
                  onChange={(e) => {
                    setAvatarUrl(e.target.value);
                  }}
                />
                {errors.avatarUrl && (
                  <label
                    htmlFor="avatar_url"
                    className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                  >
                    {errors.avatarUrl}
                  </label>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fullName" value="Full name" />
                </div>
                <TextInput
                  id="fullName"
                  className="dark:border-gray-500 dark:bg-gray-600"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                {errors.fullName && (
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                  >
                    {errors.fullName}
                  </label>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="heroType" value="Type" />
                  <Select
                    defaultValue=""
                    id="heroType"
                    onChange={(e) => {
                      setHeroType(e.target.value);
                    }}
                  >
                    <option value="" className="hidden">Select type</option>
                    {heroState.heroTypes.map((heroType: HeroType) => {
                      return (
                        <option value={heroType.id} key={heroType.id}>
                          {heroType.name}
                        </option>
                      );
                    })}
                  </Select>
                  {errors.heroType && (
                    <label
                      htmlFor="heroType"
                      className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                    >
                      {errors.heroType}
                    </label>
                  )}
                </div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <Textarea
                  id="description"
                  placeholder="Description..."
                  rows={8}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                {errors.description && (
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
                  >
                    {errors.description}
                  </label>
                )}
              </div>
              <div className="w-full">
                <button type="submit" id="save" className='w-full bg-[#63CE96] rounded-md py-3 font-bold text-white'>
                  {heroState.isLoading && <Spinner />}
                  <span className="pl-3">Save</span>
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HeroAddModal;
