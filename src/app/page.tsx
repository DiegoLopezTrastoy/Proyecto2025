"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-0 sm:pb-0 gap-16 sm:p-20 pt-0 sm:pt-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <h2 className="text-4xl font-bold mb-6">¿Cómo deseas jugar?</h2>

          <div className="space-x-4">
            <Button className="px-6 py-3 text-lg">
              Jugar en solitario
            </Button>
            <Button
              variant="outline"
              className="px-6 py-3 text-lg"
            >
              Jugar multijugador
            </Button>
          </div>

        <section className="bg-neutral-100 dark:bg-neutral-800 w-full py-16 px-6 mb-12 rounded-lg shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Acerca del juego</h2>
            <p className="text-lg mb-4">
              <strong>D&D Adventure</strong> es un juego de rol basado en el
              sistema de Dungeons & Dragons donde puedes crear tu propio
              personaje, explorar un mundo generado proceduralmente, y tomar
              decisiones que afectarán el destino de tu aventura. Lanza dados,
              elige tus habilidades y enfréntate a desafíos que pondrán a prueba
              tu ingenio y valentía.
            </p>
            <p className="text-lg mb-4">
              Puedes jugar de manera <strong>solitaria</strong> o unirte a otros
              jugadores en el modo
              <strong> multijugador</strong>, donde podrás formar alianzas,
              explorar juntos y derrotar a temibles enemigos.
            </p>
          </div>
        </section>

        <section className="bg-gray-800 text-white w-full py-16 px-6 mb-12 rounded-lg shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Elige tu clase</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-purple-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Guerrero</h3>
                <p className="text-lg mb-4">
                  Fuerte y resistente, el Guerrero es un experto en combate
                  cuerpo a cuerpo y tiene una gran resistencia a los ataques
                  enemigos. Ideal para los que prefieren un estilo de juego
                  directo y de combate cercano.
                </p>
              </div>

              <div className="bg-green-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Mago</h3>
                <p className="text-lg mb-4">
                  El Mago domina las artes arcanas y lanza poderosos hechizos.
                  Perfecto para quienes disfrutan de las tácticas a distancia y
                  manipulan la magia para afectar el campo de batalla.
                </p>
              </div>

              <div className="bg-blue-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Ladrón</h3>
                <p className="text-lg mb-4">
                  Astuto y ágil, el Ladrón es experto en el sigilo y en el robo.
                  Ideal para jugadores que prefieren el sigilo y la evasión, y
                  también son útiles en misiones de espionaje.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de mapa del mundo */}
        <section className="w-full py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-12 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6">Explora el Mundo</h2>
            <p className="text-lg mb-6">
              El mundo de D&D Adventure está lleno de misterios. Desde frondosos
              bosques hasta desoladas tierras corruptas. Cada rincón ofrece
              nuevas aventuras y desafíos. ¡Prepárate para explorar y descubrir
              lo desconocido!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
