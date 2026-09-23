import prisma from "../db.js";

export const crearLibro = async (req, res) => {
  const { titulo, autor } = req.body;
  const id = parseInt(req.usuario.id);

  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
  });

  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "solo los admin pueden crear libros" });
  }

  if (!titulo || !autor) {
    return res.status(403).json({ mensaje: "faltan datos" });
  }

  if (typeof titulo !== "string" || typeof autor !== "string") {
    return res.status(403).json({ mensaje: "el titulo y autor van enxstring" });
  }

  const libro = await prisma.libro.create({
    data: { titulo, autor },
  });

  res.json({ mensaje: "libro creado correctamente", libro });
};

export const listarLibros = async (req, res) => {
  const libros = await prisma.libro.findMany();
  const id = parseInt(req.usuario.id);

  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
  });

  if (req.usuario.rol != "admin") {
    return res.status(403).json({
      mensjase: "solo los admin pueden ver todos los libros en general",
    });
  }

  res.status(200).json(libros);
};

export const eliminarLibro = async (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
  });

  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ mensaje: "solo admin borran libros" });
  }

  const libro = await prisma.libro.findUnique({
    where: { id: id },
  });

  if (!libro) {
    return res.status(404).json({ mensaje: "libro no encontrado" });
  }

  const borrador = await prisma.libro.delete({
    where: { id: id },
  });

  res.status(200).json({ mensaje: "libro borrado correctamente", borrador });
};



 export const pedirPrestadoLibro = async (req, res) => {
  const { titulo, autor } = req.body;

  const libro = await prisma.libro.findFirst({
    where: {titulo,autor}
  })

    
  if (!libro) {
    return res.status(404).json({mensaje: "libro no encontrado"})
  }

  if (libro.disponible !== true) {
    return res.status(403).json({ mensaje: "libro no disponible"})
  }

  const prestamo = await prisma.prestamo.create({
    data: { usuarioId: req.usuario.id,libroId: libro.id}
  })

  const cambiarDisponibilidad = await prisma.libro.update({
    where: {id: libro.id},
    data: {disponible: false}
  })

  return res.status(200).json({mensaje: "libro prestado",prestamo})
} 





export const verMisPrestamos = async (req, res) => {
    const prestamo = await prisma.prestamo.findMany({
        where:{usuarioId: req.usuario.id}
    })

    if (!prestamo) {
        return res.status(404).json({mensaje: "no tienes prestamos"})
    }

    return res.status(200).json({prestamo})
}


export const verTodosPrestamos = async (req, res) => {
    const prestamos = await prisma.prestamo.findMany()


    if (req.usuario.rol !== "admin") {
        return res.status(403).json({mensaje:"solo andmin pueden verlos todoa"})
    }

    res.json(prestamos)

}

