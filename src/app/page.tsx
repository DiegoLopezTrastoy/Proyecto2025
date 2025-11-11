import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sword, Shield, Wand2, Bot as Bow, BookOpen, Heart, Zap, Eye } from 'lucide-react';
import Murmullo from '@/components/murmullo';

const classes = [
  {
    name: 'Guerrero',
    icon: Sword,
    description: 'Maestro del combate cuerpo a cuerpo',
    abilities: ['Alta resistencia', 'Combate con armas', 'Liderazgo'],
    hitDie: 'd10',
    primaryStat: 'Fuerza',
  },
  {
    name: 'Mago',
    icon: Wand2,
    description: 'Manipulador de la magia arcana',
    abilities: ['Hechizos poderosos', 'Conocimiento arcano', 'Versatilidad mágica'],
    hitDie: 'd6',
    primaryStat: 'Inteligencia',
  },
  {
    name: 'Pícaro',
    icon: Eye,
    description: 'Especialista en sigilo y precisión',
    abilities: ['Ataque furtivo', 'Habilidades de ladrón', 'Evasión'],
    hitDie: 'd8',
    primaryStat: 'Destreza',
  },
  {
    name: 'Clérigo',
    icon: Heart,
    description: 'Sanador divino y protector',
    abilities: ['Magia divina', 'Sanación', 'Canalizar divinidad'],
    hitDie: 'd8',
    primaryStat: 'Sabiduría',
  },
  {
    name: 'Explorador',
    icon: Bow,
    description: 'Rastreador y arquero experto',
    abilities: ['Combate a distancia', 'Rastreo', 'Supervivencia'],
    hitDie: 'd10',
    primaryStat: 'Destreza',
  },
  {
    name: 'Paladín',
    icon: Shield,
    description: 'Guerrero sagrado y protector',
    abilities: ['Aura protectora', 'Imposición de manos', 'Combate sagrado'],
    hitDie: 'd10',
    primaryStat: 'Carisma',
  },
];

const gameRules = [
  {
    title: 'Creación de Personaje',
    description: 'Elige tu clase, raza y distribución de características',
  },
  {
    title: 'Sistema de Dados',
    description: 'Usa dados de 20 caras para determinar el éxito de tus acciones',
  },
  {
    title: 'Puntos de Vida',
    description: 'Tu resistencia se mide en puntos de vida que varían según tu clase',
  },
  {
    title: 'Combate por Turnos',
    description: 'En combate, cada personaje actúa según su iniciativa',
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Bienvenido a D&D Adventure Master
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Embárcate en aventuras épicas con nuestro sistema de juego interactivo impulsado por IA
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            IA Avanzada
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Historias Dinámicas
          </Badge>
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold">Cómo Jugar</h2>
          <p className="text-muted-foreground">
            Reglas básicas para comenzar tu aventura
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gameRules.map((rule, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-lg">{rule.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {rule.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold">Clases de Personaje</h2>
          <p className="text-muted-foreground">
            Cada clase ofrece un estilo de juego único con habilidades especiales
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((characterClass, index) => {
            const Icon = characterClass.icon;
            return (
              <Card key={index} className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{characterClass.name}</CardTitle>
                  <CardDescription>{characterClass.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Dado de Vida:</span>
                    <Badge variant="outline">{characterClass.hitDie}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Característica Principal:</span>
                    <Badge variant="outline">{characterClass.primaryStat}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Habilidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {characterClass.abilities.map((ability, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold">Cómo Funciona Nuestro Juego</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Nuestro sistema utiliza inteligencia artificial avanzada para crear aventuras personalizadas y dinámicas
          </p>
        </div>

        <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold">Crea tu Personaje</h3>
                <p className="text-sm text-muted-foreground">
                  El chat te guiará para crear tu personaje único con historia, características y motivaciones
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold">Aventura Interactiva</h3>
                <p className="text-sm text-muted-foreground">
                  La IA genera eventos y desafíos únicos basados en tu personaje y decisiones
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold">Progresa y Evoluciona</h3>
                <p className="text-sm text-muted-foreground">
                  Tu personaje crece con cada aventura, desbloqueando nuevas habilidades y opciones
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-3xl font-semibold">El Murmullo de los Astros</h2>
        </div>
          <Murmullo />
      </section>
    </div>
  );
}