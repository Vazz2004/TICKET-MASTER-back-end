import connection from '../config/database.js'

export class GetTikedModel {
  static async createTikedModel (data) {
    const { evento_id, numerosPersonas, correoCompra, totalPagado } = data
    try {
      const [response] = await connection.query(`
                INSERT INTO tiked (evento_id, numeros_personas, correo_compra, total_pagar)
                VALUES (?, ?, ?, ?)
            `, [evento_id, numerosPersonas, correoCompra, totalPagado])
      return response
    } catch (error) {
      console.error('Error creating ticket model:', error)
      throw error
    }
  }

  static async getTikedById (id) {
    try {
      const [rows] = await connection.query(`
                SELECT * FROM tiked WHERE tiked_id = ?
            `, [id])
      return rows[0] // Return the first (and only) result
    } catch (error) {
      console.error('Error fetching ticket by ID:', error)
      throw error
    }
  }

  static async getAllTikeds () {
    try {
      const [rows] = await connection.query(`
                SELECT * FROM tiked
            `)
      return rows
    } catch (error) {
      console.error('Error fetching all tickets:', error)
      throw error
    }
  }

  static async updateTikedById (id, data) {
    const { evento_id, numerosPersonas, correoCompra, totalPagado } = data
    try {
      const [response] = await connection.query(`
                UPDATE tiked 
                SET evento_id = ?, numeros_personas = ?, correo_compra = ?, total_pagar = ?
                WHERE tiked_id = ?
            `, [evento_id, numerosPersonas, correoCompra, totalPagado, id])
      return response
    } catch (error) {
      console.error('Error updating ticket:', error)
      throw error
    }
  }

  static async deleteTikedById (id) {
    try {
      const [response] = await connection.query(`
                DELETE FROM tiked WHERE tiked_id = ?
            `, [id])
      return response
    } catch (error) {
      console.error('Error deleting ticket:', error)
      throw error
    }
  }
}
