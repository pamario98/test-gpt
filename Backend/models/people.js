const db = require('../util/database');

module.exports = class People {
  constructor(id, Nombre,ApellidoPaterno,ApellidoMaterno,Direccion,Telefono) {
    this.id = id;
    this.Nombre = Nombre;
    this.ApellidoP = ApellidoPaterno;
    this.ApellidoM = ApellidoMaterno;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM TestGPT.people');
  }

  static post(body) {
    return db.execute('INSERT INTO TestGPT.people (Nombre,ApellidoPaterno,ApellidoMaterno,Direccion,Telefono) VALUES (?,?,?,?,?)',body);
  }

  static update(body) {
    return db.execute('UPDATE TestGPT.people SET Nombre = ?, ApellidoPaterno = ?, ApellidoMaterno = ?, Direccion = ? , Telefono = ? WHERE id = ?', body);
  }

  static delete(id) {
    return db.execute('DELETE FROM TestGPT.people WHERE id = ?', [id]);
  }
};
