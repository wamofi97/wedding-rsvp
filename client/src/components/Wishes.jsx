import { useState } from "react";
import WishesForm from "./form/WishesForm";
import { useInView } from "react-intersection-observer";

const Wishes = ({wishes, setWishes}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref:inViewRef, inView } = useInView({threshold: 0.5, triggerOnce: true});
  const openUcapan = () => setIsModalOpen(true);
  const closeUcapan = () => setIsModalOpen(false);

  return (
    <div className='w-full text-center py-12'>
        <div ref={inViewRef} className= {inView ? "animate-scroll" : "opacity-0"}>
            <h5 className='font-medium mb-4 text-rose-950'>Ucapan</h5>
            <div className='max-w-96 mx-auto overflow-y-auto mb-4 bg' style={{maxHeight:'300px'}}>
                {wishes && wishes.map((wish, index) => {
                    return (
                        <div key={index} className='mx-auto'>
                            <p className='font-medium'>{wish?.name}</p>
                            <p className='italic font-light text-sm'>{wish?.message}</p>
                            <hr className='my-4 w-full h-1 bg-neutral-500 opacity-5 mx-auto'/>                
                        </div>
                    )
                })}
            </div>
            <button className='button wedding-primary' onClick={openUcapan}>Hantar Ucapan</button>
            <WishesForm isOpen={isModalOpen} onClose={closeUcapan} wishes={wishes} setWishes={setWishes}/>
        </div>
    </div>
  )
}

export default Wishes