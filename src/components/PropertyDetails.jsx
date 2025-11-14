import React, { useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, StarHalf, MapPin, Play, Images, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2 } from 'lucide-react'
import Spline from '@splinetool/react-spline'

const photosSeed = [
  'https://images.unsplash.com/photo-1505692794403-34d4982a86e8?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
]

function Stars({ value = 4.5, size = 18 }) {
  const full = Math.floor(value)
  const half = value % 1 >= 0.5
  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" />
      ))}
      {half && <StarHalf size={size} fill="currentColor" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  )
}

function Lightbox({ images, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const containerRef = useRef(null)

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  const onWheel = (e) => {
    e.preventDefault()
    const delta = Math.sign(e.deltaY)
    setScale((s) => Math.min(3, Math.max(1, s - delta * 0.1)))
  }

  const resetZoom = () => setScale(1)

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-3">
          <Images />
          <span className="text-sm opacity-80">{index + 1} / {images.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Zoom in" onClick={() => setScale((s) => Math.min(3, s + 0.25))} className="p-2 hover:bg-white/10 rounded">
            <ZoomIn />
          </button>
          <button aria-label="Zoom out" onClick={() => setScale((s) => Math.max(1, s - 0.25))} className="p-2 hover:bg-white/10 rounded">
            <ZoomOut />
          </button>
          <button aria-label="Reset zoom" onClick={resetZoom} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">Reset</button>
          <button aria-label="Close" onClick={onClose} className="p-2 hover:bg-white/10 rounded">
            <X />
          </button>
        </div>
      </div>

      <div className="flex-1 relative select-none" ref={containerRef} onWheel={onWheel}>
        <img
          src={images[index]}
          alt={`Photo ${index + 1}`}
          className="absolute inset-0 m-auto max-w-none"
          style={{ transform: `scale(${scale})`, transformOrigin: 'center', top: '50%', left: '50%', translate: '-50% -50%' }}
        />

        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white">
          <ChevronLeft />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white">
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}

export default function PropertyDetails() {
  const { scrollYProgress } = useScroll()

  // Dynamic background that shifts hue and gradient stops as you scroll (frame-by-frame feel)
  const hue = useTransform(scrollYProgress, [0, 1], [0, 220])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0.5, 0.6, 0.8])

  const images = useMemo(() => photosSeed, [])
  const [showLightbox, setShowLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (idx) => {
    setLightboxIndex(idx)
    setShowLightbox(true)
  }

  const mapUrl = 'https://www.google.com/maps?q=40.748817,-73.985428' // Example: Empire State Building

  return (
    <div className="relative min-h-screen">
      {/* Scroll reactive background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          filter: hue.to((h) => `hue-rotate(${h}deg)`),
          opacity: bgOpacity,
          background:
            'radial-gradient(1200px 600px at 10% 10%, rgba(99,102,241,0.25), transparent), radial-gradient(1000px 500px at 90% 30%, rgba(56,189,248,0.25), transparent), radial-gradient(1200px 600px at 50% 90%, rgba(168,85,247,0.25), transparent)'
        }}
      />

      {/* Hero with Spline 3D cover */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Overlay content */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-10 left-0 right-0 px-6 md:px-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl mx-auto backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">Skyline Vista Apartments</h1>
                <p className="mt-2 text-gray-700 flex items-center gap-2"><MapPin className="text-blue-600"/> Midtown, New York • 2.1 km from Central Park</p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <Stars value={4.6} size={20} />
                <p className="text-sm text-gray-700">4.6 out of 5 • 238 reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo gallery with + photos */}
      <section className="relative max-w-6xl mx-auto px-6 md:px-12 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-4 gap-3 md:gap-4"
        >
          {images.slice(0, 5).map((src, idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              className={`relative overflow-hidden rounded-xl group col-span-2 ${idx === 0 ? 'row-span-2' : 'row-span-1'} ${idx > 0 ? 'col-span-1' : ''}`}
            >
              <img src={src} alt={`Property ${idx + 1}`} className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-105"/>
              {idx === 4 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold flex items-center gap-2"><Images size={20}/> + {images.length - 4} photos</span>
                </div>
              )}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Details & Pricing */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Property Details</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
              <li>3 Bedrooms</li>
              <li>2 Bathrooms</li>
              <li>1,450 sq ft</li>
              <li>Floor 18</li>
              <li>City View</li>
              <li>Pet Friendly</li>
            </ul>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Experience modern living with floor-to-ceiling windows, an open-concept kitchen with marble countertops, and smart-home automation throughout. The building includes a rooftop pool, fitness center, and 24/7 concierge.
            </p>
          </div>

          {/* What we say */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">What we say</h3>
            <div className="flex items-start gap-4">
              <Stars value={4.8} />
              <p className="text-gray-700">“A rare blend of location, design, and amenities. Perfect for urban professionals who value both style and convenience.”</p>
            </div>
          </div>

          {/* What users say */}
          <div className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">What tenants say</h3>
            <div className="space-y-4">
              {[
                { name: 'Emily R.', rating: 5, text: 'Loved the view and the building staff is incredibly helpful.' },
                { name: 'Marcus L.', rating: 4, text: 'Great gym and pool. Elevators can be busy during rush hours.' },
                { name: 'Priya S.', rating: 4.5, text: 'Apartments are bright and well insulated. Noise is minimal.' },
              ].map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl bg-white/60 border border-white/80">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{r.name}</p>
                    <Stars value={r.rating} size={16} />
                  </div>
                  <p className="text-gray-700">{r.text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video section */}
          <div className="p-0 rounded-2xl overflow-hidden bg-black/5 border border-white/60">
            <div className="aspect-video relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Property walkthrough video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            <div className="p-4 flex items-center gap-3">
              <Play className="text-blue-600" />
              <p className="text-gray-700">Watch a short walkthrough of the apartment and amenities.</p>
            </div>
          </div>
        </motion.div>

        {/* Pricing card */}
        <motion.aside initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-1">
          <div className="sticky top-6 p-6 rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-xl">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-extrabold text-gray-900">$4,250</span>
              <span className="text-gray-500 mb-1">/ month</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Utilities not included • 12-month lease</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-white border">No broker fee</div>
              <div className="p-3 rounded-xl bg-white border">1 month free</div>
              <div className="p-3 rounded-xl bg-white border">Furnished</div>
              <div className="p-3 rounded-xl bg-white border">Parking optional</div>
            </div>
            <button className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors">Schedule a tour</button>
            <button className="mt-3 w-full py-3 rounded-xl bg-white hover:bg-gray-50 border font-semibold transition-colors flex items-center justify-center gap-2"><Share2 size={18}/> Share</button>
          </div>
        </motion.aside>
      </section>

      {/* Map section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl overflow-hidden border border-white/60 bg-white/60">
          <div className="h-72 w-full relative">
            <iframe
              title="Map"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9428219362323!2d-73.98773122366027!3d40.74844053510043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ae30c9b1b5%3A0x3f518d42e4d9d8f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000"
              allowFullScreen
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white to-transparent">
              <button onClick={() => window.open(mapUrl, '_blank')} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors inline-flex items-center gap-2">
                <MapPin size={18}/> Open exact location
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-white/60 backdrop-blur border-t">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Skyline</p>
            <p className="text-sm">Modern homes curated for city living. Crafted with care.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Explore</p>
            <ul className="space-y-1 text-sm">
              <li><a className="hover:text-gray-900" href="#">Apartments</a></li>
              <li><a className="hover:text-gray-900" href="#">Townhomes</a></li>
              <li><a className="hover:text-gray-900" href="#">Penthouses</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Company</p>
            <ul className="space-y-1 text-sm">
              <li><a className="hover:text-gray-900" href="#">About</a></li>
              <li><a className="hover:text-gray-900" href="#">Careers</a></li>
              <li><a className="hover:text-gray-900" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Legal</p>
            <ul className="space-y-1 text-sm">
              <li><a className="hover:text-gray-900" href="#">Privacy</a></li>
              <li><a className="hover:text-gray-900" href="#">Terms</a></li>
              <li><a className="hover:text-gray-900" href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 py-4">© {new Date().getFullYear()} Skyline. All rights reserved.</div>
      </footer>

      {showLightbox && (
        <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setShowLightbox(false)} />)
      }
    </div>
  )
}
