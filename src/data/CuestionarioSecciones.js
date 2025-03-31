const secciones = [
    {
        titulo: "Datos Generales",
        preguntas: [
            { id: "nombre", texto: "Nombre del empleado:", tipo: "texto" },
            { id: "puesto", texto: "Puesto:", tipo: "texto" },
            { id: "organizacion", texto: "Organización:", tipo: "texto" },
            { id: "departamento", texto: "Departamento/Área:", tipo: "texto" },
            {id: "sexo", texto: "Sexo:", tipo: "opcion", opciones: ["Masculino", "Femenino"]},
            { id: "fecha", texto: "Fecha:", tipo: "fecha" },
        ]
    },
    {
        titulo: "Instrucciones para responder",
        instrucciones: `Las respuestas van del 1 al 5, donde:
        
        5 = Siempre / Muy de acuerdo / Muy positivo
        4 = Casi siempre / De acuerdo / Positivo
        3 = Algunas veces / Neutral
        2 = Casi nunca / En desacuerdo / Negativo
        1 = Nunca / Muy en desacuerdo / Muy negativo`
    },
    {
        titulo: "I. Condiciones en el Ambiente de Trabajo",
        preguntas: [
            { id: 1, texto: "En mi trabajo, las condiciones de iluminación, ruido, temperatura y ventilación son adecuadas.", tipo: "escala" },
            { id: 2, texto: "Cuento con el equipo y herramientas necesarias para realizar mis actividades de manera segura y eficiente.", tipo: "escala" }
        ]
    },
    {
        titulo: "II. Carga de Trabajo",
        preguntas: [
            { id: 3, texto: "Mi carga de trabajo es adecuada y puedo cumplir con mis tareas en el tiempo asignado.", tipo: "escala" },
            { id: 4, texto: "Frecuentemente debo trabajar horas extra para cumplir con mis tareas.", tipo: "escala" },
            { id: 5, texto: "En mi trabajo, se presentan periodos de carga excesiva de trabajo.", tipo: "escala" }
        ]
    },
    {
        titulo: "III. Control sobre el Trabajo",
        preguntas: [
            { id: 6, texto: "Puedo tomar decisiones sobre la forma en que realizo mi trabajo.", tipo: "escala" },
            { id: 7, texto: "Tengo la posibilidad de participar en la toma de decisiones que afectan mi trabajo.", tipo: "escala" }
        ]
    },
    {
        titulo: "IV. Jornada de Trabajo",
        preguntas: [
            { id: 8, texto: "Mi jornada laboral me permite descansar y atender asuntos personales.", tipo: "escala" },
            { id: 9, texto: "Tengo tiempo suficiente para descansar entre jornadas de trabajo.", tipo: "escala" }
        ]
    },
    {
        titulo: "V. Relaciones en el Trabajo",
        preguntas: [
            { id: 10, texto: "La relación con mis compañeros de trabajo es cordial y de apoyo.", tipo: "escala" },
            { id: 11, texto: "La relación con mis superiores es de respeto y apoyo mutuo.", tipo: "escala" },
            { id: 12, texto: "Me siento valorado(a) por mi trabajo y esfuerzo.", tipo: "escala" }
        ]
    },
    {
        titulo: "VI. Violencia Laboral",
        preguntas: [
            { id: 13, texto: "He sido víctima de violencia laboral (insultos, humillaciones, acoso, etc.) en mi trabajo.", tipo: "escala" },
            { id: 14, texto: "En mi trabajo hay protocolos o mecanismos para denunciar situaciones de violencia laboral.", tipo: "escala" }
        ]
    },
    {
        titulo: "VII. Reconocimiento y Desarrollo",
        preguntas: [
            { id: 15, texto: "Mi trabajo es reconocido por mis superiores.", tipo: "escala" },
            { id: 16, texto: "Tengo oportunidades de capacitación y desarrollo profesional.", tipo: "escala" }
        ]
    },
    {
        titulo: "VIII. Balance Vida-Trabajo",
        preguntas: [
            { id: 17, texto: "Mi trabajo me permite equilibrar mi vida personal y laboral.", tipo: "escala" },
            { id: 18, texto: "Puedo desconectarme del trabajo cuando termina mi jornada laboral.", tipo: "escala" }
        ]
    },
    {
        titulo: "IX. Estrés Laboral",
        preguntas: [
            { id: 19, texto: "Durante mi jornada laboral, me siento tenso(a) o estresado(a).", tipo: "escala" },
            { id: 20, texto: "Mi trabajo me genera ansiedad o dificultad para dormir.", tipo: "escala" }
        ]
    },
    {
        titulo: "X. Evaluación General",
        preguntas: [
            { id: 21, texto: "¿Te sientes satisfecho(a) con tu trabajo?", tipo: "escala" },
        ]
    }
];

export default secciones;
