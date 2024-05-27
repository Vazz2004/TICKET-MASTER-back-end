import connection from '../config/database.js'

export class GetTikedModel {
  static async createTikedModel (data) {
    const { evento, numeroPersonas, correo, totalPagado } = data
    try {
      const [response] = await connection.query(`
                INSERT INTO tiked (evento_id, numeros_personas, correo_compra, total_pagar)
                VALUES (?, ?, ?, ?)
            `, [evento, numeroPersonas, correo, totalPagado])
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
      return rows[0]
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

  static async eventosModel () {
    try {
      const [response] = await connection.query('select id_evento , nombre_evento , valor_tiked from evento;')
      return response
    } catch (error) {
      console.log(error)
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

export class ticketController {
  static async createTikedController (req, res) {
    try {
      const data = req.body
      const response = await GetTikedModel.createTikedModel(data)
      res.status(201).json(response)
    } catch (error) {
      console.error('Error creating ticket:', error)
      res.status(500).json({ message: 'Error creating ticket', error })
    }
  }

  static async getTikedByIdController (req, res) {
    try {
      const { id } = req.params
      const ticket = await GetTikedModel.getTikedById(id)
      if (ticket) {
        res.status(200).json(ticket)
      } else {
        res.status(404).json({ message: 'Ticket not found' })
      }
    } catch (error) {
      console.error('Error fetching ticket:', error)
      res.status(500).json({ message: 'Error fetching ticket', error })
    }
  }

  static async getAllTikedsController (req, res) {
    try {
      const tickets = await GetTikedModel.getAllTikeds()
      res.status(200).json(tickets)
    } catch (error) {
      console.error('Error fetching all tickets:', error)
      res.status(500).json({ message: 'Error fetching all tickets', error })
    }
  }

  static async updateTikedByIdController (req, res) {
    try {
      const { id } = req.params
      const data = req.body
      const response = await GetTikedModel.updateTikedById(id, data)
      if (response.affectedRows > 0) {
        res.status(200).json({ message: 'Ticket updated successfully' })
      } else {
        res.status(404).json({ message: 'Ticket not found' })
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
      res.status(500).json({ message: 'Error updating ticket', error })
    }
  }

  static async deleteTikedByIdController (req, res) {
    try {
      const { id } = req.params
      const response = await GetTikedModel.deleteTikedById(id)
      if (response.affectedRows > 0) {
        res.status(200).json({ message: 'Ticket deleted successfully' })
      } else {
        res.status(404).json({ message: 'Ticket not found' })
      }
    } catch (error) {
      console.error('Error deleting ticket:', error)
      res.status(500).json({ message: 'Error deleting ticket', error })
    }
  }

  static async eventosController (req, res) {
    try {
      const response = await GetTikedModel.eventosModel()
      res.json(response)
    } catch (error) {
      console.log(error)
    }
  }
}
