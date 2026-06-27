'use client';

import { Environment, useGLTF, CameraControls, useTexture } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Genişlik ve yükseklik ayarlarını ekledik (Varsayılan olarak 2x1.5)
function Slide({ url, position, rotation, width = 2, height = 1.5, onImageClick }: { url: string, position: [number, number, number], rotation: [number, number, number], width?: number, height?: number, onImageClick: (url: string) => void }) {
  const texture = useTexture(url);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  return (
// Slide bileşeninin içindeki mesh'i bu şekilde değiştir:
<mesh 
  position={position} 
  rotation={rotation}
  // onClick yerine onPointerUp kullanıyoruz
onPointerUp={(e) => {
  e.stopPropagation();
  console.log("Resme tıklandı! URL:", url); // Buraya bak!
  onImageClick(url);
}}
  onPointerOver={(e) => { 
    e.stopPropagation(); 
    setHovered(true); 
    document.body.style.cursor = 'pointer'; 
  }}
  onPointerOut={(e) => { 
    e.stopPropagation(); 
    setHovered(false); 
    document.body.style.cursor = 'auto'; 
  }}
>
  <planeGeometry args={[width, height]} />
  <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
</mesh>
  );
}
function Gallery({ onMove }: { onMove: (e: any) => void }) {
  const { scene } = useGLTF('/gallery.glb');
  return <primitive object={scene} scale={1} position={[0, 0, 0]} onDoubleClick={onMove} />;
}

export default function MuseumScene({ onImageClick }: { onImageClick: (url: string) => void }) {
  const cameraRef = useRef<CameraControls>(null);

  useEffect(() => {
    cameraRef.current?.setLookAt(0, 1.5, 0, 2, 1.5, -1, false);
  }, []);

const handleDoubleClick = (e: any) => {
    e.stopPropagation();
    
    // YENİ AYAR: 0.5 metre sınırını 1.2 metreye çıkardık. 
    // Artık masaların alt kısımlarına, sandalyelere veya alçak engellere tıklayıp yanlarına gidebilirsin.
    if (e.point.y > 1.2) return; 
    
    const { x, z } = e.point;
    cameraRef.current?.setLookAt(
      x, 1.5, z,       
      x, 1.5, z - 0.1, 
      true             
    );
  };

  return (
    <>
      <Environment preset="city" />
      <CameraControls 
        ref={cameraRef}
        makeDefault
        minDistance={0.01}
        maxDistance={0.01} 
        dollySpeed={0}
        azimuthRotateSpeed={0.3} 
        polarRotateSpeed={0.3}   
      />

     <Suspense fallback={null}>
        <Gallery onMove={handleDoubleClick} />
        
        {/* SOL DUVARDAKİ İLK ÇERÇEVEYİ KAPATMAK İÇİN ÖRNEK */}

        <Slide 
          url="/slides/slide0_1.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[11.45, 1.3, 0.81]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[22*Math.PI/180,148*Math.PI/180,-15*Math.PI/180]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={0.5} 
          height={0.75} 
          
          onImageClick={onImageClick} 
        />

        <Slide 
          url="/slides/slide1.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[7.8, 1.3, -0.96]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,0,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.6} 
          
          onImageClick={onImageClick} 
        />
        <Slide 
          url="/slides/slide3.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[5.9, 1.3, -0.96]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,0,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.6} 
          
          onImageClick={onImageClick} 
        />

        <Slide 
          url="/slides/slide4.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[3.3, 1.3, -0.96]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,0,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.6} 
          
          onImageClick={onImageClick} 
        />


        <Slide 
          url="/slides/slide5.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[1.3, 1.3, -0.96]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,0,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.6} 
          
          onImageClick={onImageClick} 
        />



        <Slide 
          url="/slides/slide22.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[-2.3, 1.4, -0.932]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,0,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.5} 
          height={1.6} 
          
          onImageClick={onImageClick} 
        />




// Berna Teyze Duvarı 


        <Slide 
          url="/slides/slide6.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[7.8, 1.3, 0.71]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/1,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.2} 
          
          onImageClick={onImageClick} 
        />

        <Slide 
          url="/slides/slide7.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[5.3, 1.3, 0.71]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/1,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.2} 
          
          onImageClick={onImageClick} 
        />


        <Slide 
          url="/slides/slide8.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[2.8, 1.3, 0.71]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/1,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.3} 
          
          onImageClick={onImageClick} 
        />


        <Slide 
          url="/slides/slide9.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[0.3, 1.3, 0.71]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/1,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.3} 
          
          onImageClick={onImageClick} 
        />



        <Slide 
          url="/slides/slide10.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[-2,1.3, 0.71]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/1,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.6} 
          height={1.7} 
          
          onImageClick={onImageClick} 
        />


       // 2. Kişi Duvar fotoğrafları  tablosuz oda

       
              <Slide 
          url="/slides/slide11.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[-5.57,1.5,-2.16]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,-Math.PI/3,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.002} 
          height={1.002} 
          
          onImageClick={onImageClick} 
        />


              <Slide 
          url="/slides/slide13.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[-12.542,1.5,0.25]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/2,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.002} 
          
          onImageClick={onImageClick} 
        />


              <Slide 
          url="/slides/slide12.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[-10.4,1.5,3.35]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/1.23,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.2} 
          
          onImageClick={onImageClick} 
        />


          <Slide 
          url="/slides/slide21.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[-5.63,1.7,2.16]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,235*Math.PI/180,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.2} 
          height={1.2} 
          
          onImageClick={onImageClick} 
        />




      // Tablolu 3. oda 

        <Slide 
          url="/slides/slide14.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[10.3,1.5,-3.35]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/5.5,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.26} 
          height={1.26} 
          
          onImageClick={onImageClick} 
        /> 
 
        <Slide 
          url="/slides/slide15.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[12.6,1.5,3.75]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/180,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.26} 
          height={1.26} 
          
          onImageClick={onImageClick} 
        /> 
 

        <Slide 
          url="/slides/slide17.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[14.8,1.5,2.9]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,Math.PI/4.6,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.26} 
          height={1.26} 
          
          onImageClick={onImageClick} 
        /> 

        <Slide 
          url="/slides/slide18.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[8.85,1.5,1.6]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,111*Math.PI/180,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.26} 
          height={1.26} 
          
          onImageClick={onImageClick} 
        /> 



        <Slide 
          url="/slides/slide20.jpg" 
          
          // X: Sağ/Sol (Koridorun sol duvarına yaslamak için eksi bir değer, örn: -2.5)
          // Y: Yükseklik (Çerçevenin yüksekliğine göre ayarla, örn: 1.8)
          // Z: İleri/Geri (Koridordaki derinlik)
          position={[14,1.5,-3.5]} 
          
          // Sağa doğru bakması için -90 derece çeviriyoruz
          rotation={[0,-30*Math.PI/180,0]} 
          
          // Arkadaki çerçeveyi tam kapatacak boyutu bulana kadar bunlarla oyna
          width={1.8} 
          height={1.26} 
          
          onImageClick={onImageClick} 
        /> 





      </Suspense>
    </>
  );
}