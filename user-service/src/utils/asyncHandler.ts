import type {
Request,
Response,
NextFunction,
RequestHandler
} from 'express'

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>

function asyncHandler(fn : AsyncRouteHandler) : RequestHandler{
     function handler(req : Request,res : Response, next : NextFunction){
          Promise.resolve()
          .then(()=> fn(req,res,next))
          .catch((error)=> next(error))
     }

     return handler
}

export default asyncHandler;