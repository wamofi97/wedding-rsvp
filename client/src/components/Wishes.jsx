const Wishes = () => {
  return (
    <div className='d-flex flex-column align-items-center text-center w-100'>
        <h2>UCAPAN</h2>
            <div className='wishes'>
                <div className='wish'>
                <p className='wisher-name text-center'>Badrul</p>
                <p className='wish-message text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate odio fugiat autem tempora possimus sed blanditiis odit optio alias architecto.</p>
                </div>
                <div className='wish'>
                <p className='wisher-name text-center'>Badrul</p>
                <p className='wish-message text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate odio fugiat autem tempora possimus sed blanditiis odit optio alias architecto.</p>
                </div>
                <div className='wish'>
                <p className='wisher-name text-center'>Badrul</p>
                <p className='wish-message text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate odio fugiat autem tempora possimus sed blanditiis odit optio alias architecto.</p>
                </div>
            </div>
            <hr className='mt-5 w-100' style={{ height: '2px',width:'500px', backgroundColor: 'black' }} />
    </div>
  )
}

export default Wishes