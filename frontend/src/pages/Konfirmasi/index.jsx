import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleTrackRequest = () => {
    // Ganti '/status' dengan rute yang sesuai dengan halaman status Anda
    navigate('/track');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #C62828, #ba3030)' }}>
      <div className="bg-white p-8 rounded shadow-lg max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-red-800">Terima kasih sudah mengkonfirmasi permintaan Anda!</h2>
        <p className="text-gray-800 mb-6">Kami akan segera memprosesnya. Untuk memonitor, Anda dapat menggunakan fasilitas tracking atau memeriksa kotak masuk email Anda secara periodik.</p>
        <div className="flex justify-center">
          <button onClick={handleTrackRequest} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Track Request</button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
