const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',

  }).code(500);

  return response;
};

const getNodeHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteDetail = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      id,
      title,
      tags,
      body,
      updatedAt,
    };
  }

  return h.response({
    status: 'failed',
    message: 'gagal memperbarui catatan',
  });
};

const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index !== 1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    }).code(200);
    return response;
  }

  return h.response({
    status: 'failed',
    message: 'data gagal dihapus',
  });
};

module.exports = {
  addNoteHandler, getNodeHandler, getNoteDetail, editNoteByIdHandler, deleteNoteByIdHandler,
};
