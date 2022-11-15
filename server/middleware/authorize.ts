import { NextFunction } from "express"
import Admin from "../models/Admin"

const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = ((req as any).body.id) 
        if (id === null || id === undefined) throw new Error('Could not Authorize')
        const check = await Admin.checkIfAdmin(req.body.id)
        console.log(check)
    } 
}