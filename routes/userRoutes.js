import { Router } from 'express'
import { ticketController } from '../controllers/tikedController.js'

export const apptiked = Router()

apptiked.post('/create-tiked', ticketController.createTikedController)
apptiked.get('/tikeds/:id', ticketController.getTikedByIdController)
apptiked.get('/tikeds', ticketController.getAllTikedsController)
apptiked.get('/eventos', ticketController.eventosController)
apptiked.put('/tikeds/:id', ticketController.updateTikedByIdController)
apptiked.delete('/tikeds/:id', ticketController.deleteTikedByIdController)
