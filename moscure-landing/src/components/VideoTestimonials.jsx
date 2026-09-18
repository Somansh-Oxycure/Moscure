import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2 } from 'lucide-react'

export default function VideoTestimonials({ accent = 'cyan' }) {
  // Master list of all video IDs used across the pages
  const videoIds = ['IaXg1IM96S0', 'Ps9vQaeOXAw', 'fxRRmOhtzek', 'BXlIOvM3LpE', 'GaSK2J-HMy4', 'ddaxKgiJzOY', 'uO3goxBOjOM']
  const [expandedVideo, setExpandedVideo] = useState(null)

  const gradientClass = accent === 'yellow' ? 'text-gradientyellow' : 'text-gradientcyan'

  return (
    <section className="relative py-16 md:py-24 border-t border-borderDefault bg-background overflow-hidden">
      {/* Expanded Video Overlay */}
      <AnimatePresence>
        {expandedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
            onClick={() => setExpandedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-[400px] h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors border border-white/20"
              >
                ✕
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${expandedVideo}?autoplay=1&mute=0&rel=0&playsinline=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className={`font-mono text-xs uppercase tracking-widest ${gradientClass} mb-3`}>
            ✦ WATCH IT IN ACTION
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white leading-none">
            Client Stories
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {videoIds.map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] relative rounded-2xl overflow-hidden bg-surface border border-borderDefault cursor-pointer group"
                style={{ aspectRatio: '9/16' }}
                onClick={() => setExpandedVideo(id)}
              >
                {/* Overlay for clicking & hover effect */}
                <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30 transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all">
                    <Volume2 className="w-8 h-8 text-white ml-1" />
                  </div>
                </div>

                {/* YouTube iframe trick to hide controls and play silently */}
                <div className="absolute inset-0 w-full h-[130%] -top-[15%] pointer-events-none">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fading edges for carousel */}
          <div className="absolute top-0 bottom-0 left-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-8 md:w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
