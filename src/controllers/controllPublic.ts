import type {Request, Response} from 'express';

class ControllPublic {

  public async principal(req: Request, res: Response): Promise<void> {

    res.status(200).json({ message: 'This is a public endpoint at Home.'});

  } 

}

export default  new ControllPublic();
