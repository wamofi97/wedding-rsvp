import React from 'react'

const Aturcara = () => {
  return (
    <div className='d-flex flex-column align-items-center w-100'>
        <h2>ATURCARA</h2>
        <table>
            <tbody>
                <tr>
                    <td>11.30 AM</td>
                    <td>Ketibaan Tetamu Jemputan</td>
                </tr>
                <tr>
                    <td>1.00 PM</td>
                    <td>Ketibaan Pengantin</td>
                </tr>
                <tr>
                    <td>2.00 PM</td>
                    <td>Sesi Fotografi</td>
                </tr>
                <tr>
                    <td>4.30 PM</td>
                    <td>Majlis bersurai </td>
                </tr>
            </tbody>
        </table>
        <hr className='mt-5 w-100' style={{ height: '2px', backgroundColor: 'black' }} />
    </div>
  )
}

export default Aturcara