import { useState } from "react";
import WishesForm from "./form/WishesForm";

const Wishes = ({wishes, setWishes}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openUcapan = () => setIsModalOpen(true);
  const closeUcapan = () => setIsModalOpen(false);

if(wishes){
    console.log(wishes)
}

  return (
    <div className='w-full text-center'>
        <h5 className='font-medium mb-4'>Ucapan</h5>
        <div className='w-72 opac sm:w-96 mx-auto overflow-y-auto mb-4 bg' style={{maxHeight:'300px'}}>
            {wishes && wishes.map((wish) => {
                return (
                    <div key={wish?.id} className='mx-auto'>
                        <p className='font-medium'>{wish?.name}</p>
                        <p className='italic font-light text-sm'>{wish?.message}</p>
                        <hr className='my-4 w-full h-1 bg-neutral-500 opacity-10 mx-auto'/>                
                    </div>
                )
            })}
        </div>
        <button className='button wedding-primary' onClick={openUcapan}>Hantar Ucapan</button>
        <WishesForm isOpen={isModalOpen} onClose={closeUcapan} wishes={wishes} setWishes={setWishes}/>
        <hr className='my-12 h-1 bg-neutral-500 opacity-10 mx-auto'/>
    </div>
  )
}

export default Wishes