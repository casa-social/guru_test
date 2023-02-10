import {useState} from 'react'
import AddHeroButton from '../components/AddHeroButton';
import HeroList from '../components/HeroList';
import HeroAddModal from '../components/HeroAddModal';

const Home = () => {
    const [add_modal_visible, setAddModalVisible] = useState(false)
    const showAddModal = () => {
        setAddModalVisible(true)
    }
    const closeAddModal = () => {
        setAddModalVisible(false)
    }
    
    return (
        <div className='container mx-auto py-8 px-3'>
            <AddHeroButton show={showAddModal}/>
            <HeroList/>
            <HeroAddModal visible={add_modal_visible} close={closeAddModal}/>
        </div>
    )
}

export default Home;
