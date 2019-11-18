"use strict";
const Database = use("Database");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ScaffoldModel extends Model {
  static async getTables() {
    const { rows = [] } = await Database.raw(
      `select * from information_schema.tables where table_schema='public';`
    );
    const tables = rows.filter(row => row.table_name.indexOf("adonis_schema"));
    this.tables = tables.map(table => table.table_name);
    return this;
  }

  static async getDataTypes() {
    const { rows = [] } = await Database.raw(
      `SELECT COLUMN_NAME, DATA_TYPE FROM information_schema.columns WHERE table_name = '${this.table}'`
    );
    this.dataTypes = rows;
    try {
      this.accessible_attributes = this.visible.map(attribute => {
        const column = rows.find(row => row.column_name === attribute);
        return {
          name: column.column_name,
          type: column.data_type
        };
      });
      return this;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ScaffoldModel;
