import React from 'react'

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

        <p>Semoga dengan kehadiran serta iringan doa Y.B. / Y.Bhg. Tan Sri / Puan Sri / Datuk / Dato’ / Datin / Tuan / Puan pastinya akan memeriahkan lagi majlis ini dan diberkati Allah S.W.T.</p>
        <p>Terima kasih</p>
    </div>
  )
}

export default Contact