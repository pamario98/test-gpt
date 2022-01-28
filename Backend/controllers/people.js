const People = require("../models/people");

exports.getAllPeople = async (req, res, next) => {
  try {
    const [allPeople] = await People.fetchAll();
    res.status(200).json(allPeople);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPeople = async (req, res, next) => {
  try {
    let body = [
      req.body.Nombre,
      req.body.ApellidoPaterno,
      req.body.ApellidoMaterno,
      req.body.Direccion,
      req.body.Telefono,
    ];

    const postResponse = await People.post(body);
    res.status(201).json(postResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putPeople = async (req, res, next) => {
  try {
    let body = [
      req.body.Nombre,
      req.body.ApellidoPaterno,
      req.body.ApellidoMaterno,
      req.body.Direccion,
      req.body.Telefono,
      req.body.id,
    ];

    const putResponse = await People.update(body);
    res.status(200).json(putResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePeople = async (req, res, next) => {
  try {
    const deleteResponse = await People.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
