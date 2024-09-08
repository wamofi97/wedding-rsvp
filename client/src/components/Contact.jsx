const Contact = () => {
  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>Hubungi</h2>
        <div className='contacts w-100'>
            <div className='d-flex justify-content-between'>
                <p>Orang A</p>
                <div className='d-flex gap-2'>
                    <a href="tel:+60168901297">Call</a>
                    <a href="https://wa.me/60168901297" target='blank'>Whatsapp</a>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <p>Orang A</p>
                <div className='d-flex gap-2'>
                    <a href="">Call</a>
                    <a href="">Whatsapp</a>
                </div>
            </div>
            <div className='d-flex justify-content-between'>
                <p>Orang A</p>
                <div className='d-flex gap-2'>
                    <a href="">Call</a>
                    <a href="">Whatsapp</a>
                </div>
            </div>
        </div>

        <p>Semoga dengan kehadiran anda dapat memeriahkan lagi majlis kami.</p>
    </div>
  )
}

export default Contact