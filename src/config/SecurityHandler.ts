import * as express from 'express';
import validator from 'validator';

// regexp to detect html tags
const isHtml: RegExp = /<\/?[^>]+>/;

export class SecurityHandler {
  public static handleData(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): express.Response | void {
    if (isHtml.test(decodeURIComponent(req.url))) {
      return SecurityHandler.illegalCharactersDetected(res);
    }
    
    for (const itemsFromQueryIndex in req.query) { 
      if (req.query.hasOwnProperty(itemsFromQueryIndex)) {
        if (isHtml.test(req.query[itemsFromQueryIndex] as string)) {
          return SecurityHandler.illegalCharactersDetected(res);
        }
  
        req.query[itemsFromQueryIndex] = validator.trim(req.query[itemsFromQueryIndex]);
        req.query[itemsFromQueryIndex] = validator.escape(req.query[itemsFromQueryIndex]);
      }
    }

    for (const itemsFromBodyIndex in req.body) {
      if (req.body.hasOwnProperty(itemsFromBodyIndex)) {
        if (isHtml.test(req.body[itemsFromBodyIndex])) {
          return SecurityHandler.illegalCharactersDetected(res);
        }
        
        if (typeof req.body[itemsFromBodyIndex] === 'string') {
          req.body[itemsFromBodyIndex] = validator.trim(req.body[itemsFromBodyIndex]);
          req.body[itemsFromBodyIndex] = validator.escape(req.body[itemsFromBodyIndex]); 
        }

      }
    }

    next();
  }

  private static illegalCharactersDetected(res: express.Response): express.Response {
    console.warn('Illegal characters detected');
    return res.status(403).json({
      message: 'Forbidden',
      details: 'Illegal characters detected',
    });
  }
}
