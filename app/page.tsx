'use client';

import { Canvas } from '@react-three/fiber';
import MuseumScene from '../components/MuseumScene';
import { useState } from 'react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    // relative ve tailwind class'ları yerine standart stil ile arka planı sabitliyoruz
    <main style={{ width: '100vw', height: '100vh', backgroundColor: '#171717', position: 'relative' }}>
      
      <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 60 }}>
        <MuseumScene onImageClick={setSelectedImage} />
      </Canvas>

      {/* KESİN ÇÖZÜM: Inline stil ile z-index'i 999999 yaparak en üste zorluyoruz */}
      {selectedImage !== null && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // %90 Siyah arkaplan
            zIndex: 999999, // Tüm 3D evrenin üzerine çık!
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setSelectedImage(null)} 
        >
          {/* Modalın içi (Resme tıklayınca kapanmaması için stopPropagation) */}
          <div 
            style={{ position: 'relative', padding: '20px', maxWidth: '90vw', maxHeight: '90vh' }} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapatma Butonu */}
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0px',
                color: 'white',
                fontSize: '35px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            
            {/* Netleştirilmiş Slayt Resmi */}
            <img 
              src={selectedImage} 
              alt="Büyük Görünüm" 
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                border: '4px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)'
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}