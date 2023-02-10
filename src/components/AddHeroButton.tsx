import {FaPlus} from '@react-icons/all-files/fa/FaPlus'
const AddHeroButton = ({show}:{show: () => void}) => {
    const onAddButtonClick = ()=> {
        show();
    }
    return (
        <button id="add_hero" className="bg-[#63CE96] flex justify-center items-center gap-3 w-full md:w-40 py-3 text-white px-3 rounded-md text-xl font-bold" onClick={onAddButtonClick}>
            <FaPlus/>
            <div>Add hero</div>
        </button>
    )
}

export default AddHeroButton
