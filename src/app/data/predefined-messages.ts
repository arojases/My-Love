import { MessageCategory } from '../models/message.interface';

export interface PredefinedMessageCategory {
  title: MessageCategory;
  icon: string;
  messages: string[];
}

export const PREDEFINED_MESSAGE_CATEGORIES: PredefinedMessageCategory[] = [
  {
    title: 'Amor',
    icon: '♥',
    messages: [
      'Amarte se ha vuelto mi forma favorita de vivir.',
      'Contigo, cada día tiene un brillo distinto.',
      'Eres mi lugar seguro y mi aventura favorita.',
      'Mi corazón te elige incluso en mis días más caóticos.',
      'Tu amor hace que todo lo bueno se sienta más real.',
      'No sabía cuánto podía querer a alguien hasta que llegaste tú.',
      'Eres la casualidad más bonita que me pasó.',
      'Mi parte favorita del futuro siempre te incluye.',
      'Tus abrazos son mi definición de paz.',
      'Tenerte a mi lado me hace sentir profundamente afortunado.',
      'Tu sonrisa tiene permiso de arreglarme el día entero.',
      'Conquistaste cada rincón de mi alma sin hacer ruido.',
      'A tu lado, el amor se siente sencillo y enorme a la vez.',
      'Si pudiera elegir otra vez, volvería directo a ti.',
      'Mi corazón tiene tu nombre escrito en voz baja.',
      'Desde que llegaste, todo tiene más sentido.'
    ]
  },
  {
    title: 'Te extraño',
    icon: '✦',
    messages: [
      'Hoy te extraño con una ternura que no me cabe en el pecho.',
      'Cada minuto lejos de ti se siente más largo de lo normal.',
      'Extrañarte ya es parte de mi rutina favorita y menos favorita.',
      'Mi día tendría mejor ritmo si estuvieras aquí conmigo.',
      'Te extraño incluso cuando apenas te acabas de ir.',
      'Hay silencios que solo tu voz sabe llenar.',
      'Contaría las horas para verte, pero contigo hasta el tiempo me gana.',
      'Tu ausencia hace eco en las cosas pequeñas.',
      'Extraño nuestras conversaciones, tus gestos y tu manera de mirarme.',
      'Mi corazón te busca incluso cuando intento distraerme.',
      'Todo se siente un poco más frío cuando no estás cerca.',
      'Te extraño con esa intensidad bonita que solo tú provocas.',
      'Quisiera acortar la distancia con un abrazo interminable.',
      'Cada canción romántica hoy suena demasiado a ti.',
      'Mi lugar favorito sigue siendo donde estés tú.',
      'Extrañarte confirma lo importante que eres para mí.'
    ]
  },
  {
    title: 'Buenos días',
    icon: '☀',
    messages: [
      'Buenos días, amor. Ojalá hoy la vida te trate tan bonito como mereces.',
      'Despierta sabiendo que ya eres lo mejor de mi día.',
      'Que hoy te acompañen la calma, la energía y un montón de cosas lindas.',
      'Buenos días, mi persona favorita. Te mando un beso mental enorme.',
      'Espero que tu café sepa rico y que tu corazón se sienta abrazado.',
      'Hoy también te elijo desde temprano.',
      'Que el día te regale razones para sonreír y yo sea una de ellas.',
      'Buenos días, preciosa compañía de mi alma.',
      'Empieza tu día recordando que eres increíble y profundamente amada.',
      'Te mando luz, ternura y muchas ganas de verte.',
      'Que cada hora de hoy te acerque a algo bonito.',
      'Buenos días. Ya quiero saber cómo va tu mundo hoy.',
      'Abre los ojos, amor, que el universo acaba de ponerse más lindo contigo despierta.',
      'Hoy quiero que vayas por el día con la seguridad de que te admiro muchísimo.',
      'Buenos días. Mi primer pensamiento bonito fuiste tú.',
      'Que tu mañana tenga la suavidad de un abrazo mío.'
    ]
  },
  {
    title: 'Buenas noches',
    icon: '☾',
    messages: [
      'Buenas noches, amor. Descansa bonito y sueña conmigo.',
      'Que tu noche tenga silencio suave y descanso del bueno.',
      'Cierra los ojos sabiendo que alguien te ama muchísimo desde aquí.',
      'Hoy también terminaste el día siendo mi pensamiento favorito.',
      'Que el cansancio se te vaya con la tranquilidad de sabernos juntos.',
      'Buenas noches. Ojalá pudiera darte un beso en la frente ahora mismo.',
      'Te deseo un sueño liviano, tibio y lleno de paz.',
      'Duerme sabiendo que mañana volveré a quererte incluso más.',
      'Que la luna te cuide mientras yo te extraño en silencio.',
      'Mi último pensamiento del día siempre acaba encontrándote.',
      'Descansa, mi amor. Tu corazón también merece pausa.',
      'Buenas noches. Gracias por existir en mi historia.',
      'Ojalá tus sueños te abracen tan bonito como yo quisiera hacerlo.',
      'Que mañana despiertes con el alma ligera y la sonrisa fácil.',
      'Apaga el día tranquila, yo me quedo cuidando este amor.',
      'Buenas noches, mi lugar favorito.'
    ]
  },
  {
    title: 'Apoyo',
    icon: '✿',
    messages: [
      'Estoy orgulloso de ti incluso en los días en que dudas de ti misma.',
      'No tienes que poder con todo sola, aquí estoy contigo.',
      'Confío muchísimo en la fuerza que llevas dentro.',
      'Respira, amor. Paso a paso también cuenta.',
      'Tu esfuerzo vale, aunque hoy no lo sientas tan claro.',
      'Si el día pesa, comparte el peso conmigo.',
      'Eres más capaz de lo que este momento te deja ver.',
      'Recuerda que descansar también es avanzar.',
      'Estoy de tu lado en lo fácil, lo difícil y lo incierto.',
      'Puedes con esto, y si no puedes sola, lo hacemos juntos.',
      'Tu sensibilidad también es una forma de fortaleza.',
      'No olvides hablarte con la misma ternura con la que yo te hablo.',
      'Hoy no te exijas perfección, solo cariño contigo.',
      'Te acompaño incluso cuando no sé exactamente cómo ayudarte.',
      'Lo estás haciendo mejor de lo que crees.',
      'Estoy aquí para recordarte todo lo bueno que eres.'
    ]
  },
  {
    title: 'Mensajes cortos',
    icon: '❥',
    messages: [
      'Te amo bonito.',
      'Pienso en ti.',
      'Qué suerte la mía.',
      'Te extraño mucho.',
      'Eres mi calma.',
      'Te elijo siempre.',
      'Tu voz me sana.',
      'Ven a abrazarme.',
      'Mi corazón, tú.',
      'Todo mejora contigo.',
      'Te admiro muchísimo.',
      'Qué linda eres.',
      'Mi paz tiene tu nombre.',
      'Te mando un beso.',
      'Quédate en mi vida.',
      'Mi lugar favorito: tú.'
    ]
  },
  {
    title: 'Mensajes intensos',
    icon: '❤',
    messages: [
      'Te amo con una intensidad tranquila, de esas que construyen hogar.',
      'Si mi alma pudiera hablarte sin filtros, repetiría tu nombre toda la noche.',
      'Hay partes de mí que solo aprendieron a florecer contigo.',
      'No eres una etapa bonita, eres una verdad enorme en mi vida.',
      'Te quiero de una forma que me cambia por dentro.',
      'Mi amor por ti no hace ruido, pero mueve todo.',
      'Quiero ser refugio para tu caos y celebración para tu alegría.',
      'Hay una versión de mí que solo existe cuando me miras con amor.',
      'Tú no pasaste por mi vida, la transformaste.',
      'A veces me asusta lo mucho que te necesito, pero más me maravilla.',
      'Te amo con pasado, presente, ganas y futuro.',
      'No quiero algo pasajero contigo; quiero profundidad, verdad y tiempo.',
      'Mi corazón dejó de buscar cuando te encontró.',
      'Quiero aprenderte toda la vida y seguir sorprendiéndome contigo.',
      'Lo que siento por ti tiene raíz, fuego y ternura.',
      'Si amar es entregarse, contigo entendí el significado completo.'
    ]
  }
];

export const TOTAL_PREDEFINED_MESSAGES = PREDEFINED_MESSAGE_CATEGORIES.reduce(
  (total, category) => total + category.messages.length,
  0
);
