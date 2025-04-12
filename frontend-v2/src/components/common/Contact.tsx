import { Button } from '../ui/button';
import { Mail } from 'lucide-react';

const Contact = () => {
    return (
        
            <div className='h-[50vh] flex flex-col items-center justify-center'>
                <a href="mailto:journeywithquran.team@gmail.com">
                    <Button variant="secondary" className='flex flex-row items-center justify-center'>
                        <Mail className="rotate-180 "/> 
                        <span>journeywithquran.team@gmail.com</span>
                    </Button>
                </a>
            </div>
    );
};

export default Contact;