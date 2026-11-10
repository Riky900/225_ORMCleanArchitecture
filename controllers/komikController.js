const db = require('../models');
const { errorResponse } = require('../middleware/komikValidator');

function successResponse(res, message, data, status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
    error: null,
  });
}

async function getAllKomik(req, res) {
  try {
    const komik = await db.Komik.findAll({ order: [['id', 'ASC']] });
    return successResponse(res, 'Berhasil mengambil data komik', komik);
  } catch (err) {
    console.error('Error fetching komik:', err.message);
    return errorResponse(res, 'Gagal mengambil data komik', 500, err.message);
  }
}

async function getKomikById(req, res) {
  try {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) return errorResponse(res, 'Komik tidak ditemukan', 404);
    return successResponse(res, 'Berhasil mengambil data komik', komik);
  } catch (err) {
    console.error('Error fetching komik by id:', err.message);
    return errorResponse(res, 'Gagal mengambil data komik', 500, err.message);
  }
}

async function createKomik(req, res) {
  try {
    const komik = await db.Komik.create(req.body);
    return successResponse(res, 'Komik berhasil ditambahkan', komik, 201);
  } catch (err) {
    console.error('Error creating komik:', err.message);
    return errorResponse(res, 'Gagal menambahkan komik', 500, err.message);
  }
}

async function updateKomik(req, res) {
  try {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) return errorResponse(res, 'Komik tidak ditemukan', 404);
    await komik.update(req.body);
    return successResponse(res, 'Komik berhasil diperbarui', komik);
  } catch (err) {
    console.error('Error updating komik:', err.message);
    return errorResponse(res, 'Gagal memperbarui komik', 500, err.message);
  }
}

async function deleteKomik(req, res) {
  try {
    const komik = await db.Komik.findByPk(req.params.id);
    if (!komik) return errorResponse(res, 'Komik tidak ditemukan', 404);
    await komik.destroy();
    return successResponse(res, 'Komik berhasil dihapus', null);
  } catch (err) {
    console.error('Error deleting komik:', err.message);
    return errorResponse(res, 'Gagal menghapus komik', 500, err.message);
  }
}

module.exports = {
  getAllKomik,
  getKomikById,
  createKomik,
  updateKomik,
  deleteKomik,
};