import { useState } from 'react';
import { Users } from 'lucide-react';
import SuggestedUsersModal from './SuggestedUserModal';

export default function SuggestedUserButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div onClick={handleOpenModal}>
                <Users size={20} className="cursor-pointer" />
            </div>
            <SuggestedUsersModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
